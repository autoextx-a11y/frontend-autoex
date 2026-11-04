
// Server-only access to dealership inventory.
import localData from "@/data/vehicles.json";

import { fetchCars, fetchCarById } from "./cars-api";
import { mapApiCarToVehicle } from "./car-mapper";

import type { ApiCar } from "./cars-api";
import type { Vehicle, VehicleSummary } from "./vehicle-types";

// Local JSON can provide additional vehicle information.
const LOCAL_VEHICLES = localData as unknown as Vehicle[];

// Find a matching local vehicle using its VIN.
function findLocalVehicle(vin: string): Vehicle | undefined {
  return LOCAL_VEHICLES.find(
    (vehicle) => vehicle.vin?.toLowerCase() === vin.toLowerCase(),
  );
}

// Combine API data with local additional information.
function mergeApiVehicle(car: ApiCar): Vehicle {
  const apiVehicle = mapApiCarToVehicle(car);
  const localVehicle = findLocalVehicle(car.vin);

  return {
    ...localVehicle,
    ...apiVehicle,
    
        // Preserve featured and ranking information from local JSON.
    featured: localVehicle?.featured ?? false,
    featuredRank: localVehicle?.featuredRank ?? null,
    rank: localVehicle?.rank ?? 0,
    addedRank: localVehicle?.addedRank ?? 0,

    // API values always take priority.
    id: String(car.id),
    vin: car.vin,
    title: `${car.year} ${car.make} ${car.model}`,
    year: car.year,
    make: car.make,
    model: car.model,
    trim: car.trim ?? "",
    price: car.price,

    engine: car.engine ?? "",
    transmission: car.transmission ?? "",
    drivetrain: car.driveTrain ?? "",
    bodyType: car.bodyStyle ?? "",
    exteriorColor: car.exteriorColor ?? "",
    interiorColor: car.interiorColor ?? "",
    fuel: car.fuelType ?? "",
    carfaxUrl: car.carfaxUrl,

    // Keep the coming-soon image for every API vehicle.
    photos: ["/placeholder.svg"],
    comingSoon: true,

    // These details are not supplied by the API.
    mileage: null,
    stock: "",
    condition: "",

    // Preserve the local subtitle only if one exists.
    subtitle: car.trim ?? "",
  };
}

// Get all vehicles from the API.
export async function allVehicles(): Promise<Vehicle[]> {
  const { data } = await fetchCars({ limit: 50 });

  return data.map(mergeApiVehicle);
}

// NEW: Find one vehicle using its VIN.
export async function findVehicleByVin(
  vin: string,
): Promise<Vehicle | undefined> {
  const vehicles = await allVehicles();

  return vehicles.find(
    (vehicle) => vehicle.vin.toLowerCase() === vin.toLowerCase(),
  );
}

// Get one vehicle from the API using its numeric ID.
export async function findVehicle(
  id: string,
): Promise<Vehicle | undefined> {
  const car = await fetchCarById(id);

  if (!car) return undefined;

  return mergeApiVehicle(car);
}

// Convert a full vehicle into the lightweight listing shape.
export function toSummary(v: Vehicle): VehicleSummary {
  return {
    id: v.id,
    rank: v.rank,
    addedRank: v.addedRank,
    featured: v.featured,
    featuredRank: v.featuredRank,
    title: v.title,
    year: v.year,
    make: v.make,
    model: v.model,
    trim: v.cardTrim || v.trim,
    price: v.price,
    mileage: v.mileage,
    bodyType: v.bodyType,
    condition: v.condition,
    exteriorColor: v.exteriorColor,
    interiorColor: v.interiorColor,
    stock: v.stock,
    vin: v.vin,
    comingSoon: v.comingSoon,
    carfaxUrl: v.carfaxUrl,
    photos: v.photos.slice(0, 5),
    photoCount: v.photos.length,
    engine: v.card?.engine || v.engine,
    transmission: v.card?.transmission || v.transmission,
    drivetrain: v.card?.drivetrain || v.drivetrain,
  };
}
