// Shared vehicle shapes used by the server functions and the UI.

export type InfoRow = { label: string; value: string; stars?: number };
export type Group = { title: string; items: string[] };

export type Vehicle = {
  id: string;
  rank: number;
  addedRank: number;
  featured: boolean;
  featuredRank: number | null;
  title: string;
  subtitle: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  cardTrim?: string;
  price: number | null;
  mileage: number | null;
  bodyType: string;
  condition: string;
  engine: string;
  transmission: string;
  drivetrain: string;
  exteriorColor: string;
  interiorColor: string;
  fuel: string;
  stock: string;
  vin: string;
  doors: number | null;
  seating: number | null;
  /** "hash/slug.jpg" paths on the dealership CDN */
  photos: string[];
  comingSoon: boolean;
  vehicleInfo: InfoRow[];
  description: string[];
  features: Group[];
  engineDetails: { summary: string; items: string[] } | null;
  standardSpecs: Group[];
  crashRatings: { label: string; stars: number }[];
  awards: { name: string; url: string }[];
  safetyEquipment: string[];
  greenScores: Group[];
  mpg: { city: string; hwy: string } | null;
  carfaxUrl: string | null;
  card?: { engine: string; transmission: string; drivetrain: string; exteriorColor: string };
};

/** Lightweight shape sent to listing pages (cards, filters, home sections). */
export type VehicleSummary = Pick<
  Vehicle,
  | "id"
  | "rank"
  | "addedRank"
  | "featured"
  | "featuredRank"
  | "title"
  | "year"
  | "make"
  | "model"
  | "trim"
  | "price"
  | "mileage"
  | "bodyType"
  | "condition"
  | "exteriorColor"
  | "interiorColor"
  | "stock"
  | "vin"
  | "comingSoon"
  | "carfaxUrl"
> & {
  photos: string[];
  photoCount: number;
  engine: string;
  transmission: string;
  drivetrain: string;
};

const CDN = "https://cdn05.carsforsale.com";

export type PhotoSize = "480x360" | "800x600" | "1280x960";

export function photoUrl(path: string, size: PhotoSize = "800x600") {
  const slash = path.indexOf("/");
  return `${CDN}/${path.slice(0, slash)}/${size}/${path.slice(slash + 1)}`;
}

export function vehicleName(v: Pick<Vehicle, "year" | "make" | "model">) {
  return `${v.year} ${v.make} ${v.model}`;
}



export function vehicleDetailsUrl(v: VehicleSummary) {
  return `/inventory/${encodeURIComponent(v.make)}/${encodeURIComponent(
    v.model,
  )}/${encodeURIComponent(v.vin)}`;
}