import { useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  ArrowLeft,
} from "lucide-react";

export const Route = createFileRoute("/dealer/upload")({
  head: () => ({
    meta: [
      { title: "Inventory CSV Import | AutoEx" },
      {
        name: "description",
        content: "Upload and import dealer vehicle inventory.",
      },
    ],
  }),
  component: DealerUploadPage,
});

type ImportResult = {
  success?: boolean;
  message?: string;

  imported?: number;
  updated?: number;
  skipped?: number;
  rowsRead?: number;

  results?: {
    imported?: number;
    updated?: number;
    skipped?: number;
    rowsRead?: number;
    message?: string;
  };

  data?: {
    imported?: number;
    updated?: number;
    skipped?: number;
    rowsRead?: number;
    message?: string;
  };
};

function DealerUploadPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ImportResult | null>(null);

  const API_URL =
    // import.meta.env.VITE_API_URL || "http://localhost:5000";
    import.meta.env["VITE_API_URL"] || "https://shakeela5.sg-host.com";
  const selectFile = (selectedFile?: File) => {
    setError("");
    setResult(null);

    if (!selectedFile) return;

    if (!selectedFile.name.toLowerCase().endsWith(".csv")) {
      setFile(null);
      setError("Only CSV files are allowed.");
      return;
    }

    if (selectedFile.size === 0) {
      setFile(null);
      setError("The selected file is empty.");
      return;
    }

    if (selectedFile.size > 25 * 1024 * 1024) {
      setFile(null);
      setError("File size cannot exceed 25 MB.");
      return;
    }

    setFile(selectedFile);
  };

  const uploadFile = async () => {
    if (!file || loading) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API_URL}/api/dealer/upload-csv`, {
        method: "POST",
        body: formData,
      });

      const data: ImportResult = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "CSV import failed. Please try again.");
      }

      setResult(data);
      setFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong while uploading.");
    } finally {
      setLoading(false);
    }
  };

  const importData = result?.results ?? result?.data ?? result;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <a
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-600 hover:text-primary"
        >
          <ArrowLeft size={16} />
          Back to website
        </a>

        <div className="mb-8">
          <div className="mb-3 flex items-center gap-2">
            <FileSpreadsheet className="text-primary" size={28} />
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              AutoEx Inventory Management
            </span>
          </div>

          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Import Vehicle Inventory
          </h1>

          <p className="mt-3 text-slate-600">
            Upload the latest dealer inventory CSV file. New vehicles will be added and existing
            vehicles will be updated automatically using their VIN.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-semibold text-slate-900">Upload CSV File</h2>

          <p className="mt-1 text-sm text-slate-500">
            Select the inventory file from your computer.
          </p>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={loading}
            className="mt-6 flex min-h-64 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 px-5 text-center transition hover:border-primary hover:bg-orange-50/30 disabled:opacity-50"
          >
            <div className="mb-4 rounded-full bg-orange-100 p-4">
              <Upload size={30} className="text-primary" />
            </div>

            <span className="font-semibold text-slate-800">Click to select your CSV file</span>

            <span className="mt-2 text-sm text-slate-500">Only .csv files are accepted</span>

            <span className="mt-1 text-xs text-slate-400">Maximum file size: 25 MB</span>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,text/csv"
            className="hidden"
            disabled={loading}
            onChange={(event) => selectFile(event.target.files?.[0])}
          />

          {file && (
            <div className="mt-5 flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-4">
              <div className="flex min-w-0 items-center gap-3">
                <FileSpreadsheet className="shrink-0 text-green-600" size={28} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-800">{file.name}</p>
                  <p className="text-xs text-slate-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  setError("");
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
                disabled={loading}
                aria-label="Remove selected file"
                className="rounded p-2 text-slate-400 hover:bg-slate-100 hover:text-red-500"
              >
                <X size={18} />
              </button>
            </div>
          )}

          {error && (
            <div className="mt-5 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <AlertCircle className="mt-0.5 shrink-0" size={18} />
              {error}
            </div>
          )}

          {result && (
            <div className="mt-5 rounded-lg border border-green-200 bg-green-50 p-5">
              <div className="flex items-center gap-2 font-semibold text-green-800">
                <CheckCircle2 size={20} />
                Import completed
              </div>

              <p className="mt-2 text-sm text-green-700">
                {importData?.message ||
                  result.message ||
                  "Your inventory file was processed successfully."}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  ["Imported", importData?.imported ?? 0],
                  ["Updated", importData?.updated ?? 0],
                  ["Skipped", importData?.skipped ?? 0],
                  ["Rows Read", importData?.rowsRead ?? 0],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-lg bg-white p-3 text-center">
                    <p className="text-xl font-bold text-slate-900">{value}</p>
                    <p className="mt-1 text-xs text-slate-500">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={uploadFile}
            disabled={!file || loading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-primary px-5 py-3.5 font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 size={19} className="animate-spin" />
                Processing inventory...
              </>
            ) : (
              <>
                <Upload size={19} />
                Upload & Import Inventory
              </>
            )}
          </button>
        </div>

        <div className="mt-5 rounded-lg border border-blue-100 bg-blue-50 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle size={19} className="mt-0.5 shrink-0 text-blue-600" />
            <div>
              <p className="text-sm font-semibold text-blue-900">Automatic inventory updates</p>
              <p className="mt-1 text-sm text-blue-800">
                Existing vehicles will be matched by VIN. New vehicles will be inserted, while
                matching vehicles will receive updated information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
