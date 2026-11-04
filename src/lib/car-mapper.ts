
import type { ApiCar } from "./cars-api";
import type { Vehicle } from "./vehicle-types";

const PLACEHOLDER_IMG = "/placeholder.svg";

export function mapApiCarToVehicle(c: ApiCar): Vehicle {
  const title = `${c.year} ${c.make} ${c.model}`;

  return {
    id: String(c.id),
    vin: c.vin,
    stock: "",

    rank: 0,
    addedRank: 0,
    featured: false,
    featuredRank: null,

    title,
    subtitle: c.trim ?? "",

    year: c.year,
    make: c.make,
    model: c.model,
    trim: c.trim ?? "",

    price: c.price,
    mileage: null,

    bodyType: c.bodyStyle ?? "",
    condition: "",

    engine: c.engine ?? "",
    transmission: c.transmission ?? "",
    drivetrain: c.driveTrain ?? "",

    exteriorColor: c.exteriorColor ?? "",
    interiorColor: c.interiorColor ?? "",
    fuel: c.fuelType ?? "",

    doors: null,
    seating: null,

    photos: [PLACEHOLDER_IMG],
    comingSoon: true,

    vehicleInfo: [],
    description: [],
    features: [],
    engineDetails: null,
    standardSpecs: [],
    crashRatings: [],
    awards: [],
    safetyEquipment: [],
    greenScores: [],
    mpg: null,

    carfaxUrl: c.carfaxUrl,
  };
}
