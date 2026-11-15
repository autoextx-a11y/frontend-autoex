const API_URL = import.meta.env["VITE_API_URL"] ?? "http://localhost:5000";

export type ApiCar = {
  id: number;
  vin: string;
  stockNumber: string | null;
  dealerId: number;

  year: number;
  make: string;
  model: string;
  trim: string | null;

  odometer: number | null;
  price: number;

  interiorColor: string | null;
  exteriorColor: string | null;

  transmission: string | null;
  bodyStyle: string | null;
  condition: string | null;

  certified: boolean;

  engine: string | null;
  driveTrain: string | null;
  fuelType: string | null;
  carfaxUrl: string | null;

  description: string | null;
  equipment: string[];
  photos: string[];

  photosUpdatedAt: string | null;
  vdpUrl: string | null;

  isActive: boolean;
  lastSeenAt: string | null;
};

export type ApiListResponse = {
  data: ApiCar[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
};

export async function fetchCars(
  params: Record<string, string | number | undefined> = {},
): Promise<ApiListResponse> {
  const qs = new URLSearchParams();

  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== "") qs.set(k, String(v));
  });

  const res = await fetch(`${API_URL}/api/cars?${qs.toString()}`);

  if (!res.ok) throw new Error(`Failed to load cars (${res.status})`);

  return res.json();
}

export async function fetchCarById(id: string | number): Promise<ApiCar | null> {
  const res = await fetch(`${API_URL}/api/cars/${id}`);

  if (res.status === 404) return null;

  if (!res.ok) throw new Error(`Failed to load car (${res.status})`);

  return res.json();
}
