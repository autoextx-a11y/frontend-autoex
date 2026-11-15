import type { ApiCar } from "./cars-api";
import type { Vehicle } from "./vehicle-types";

const PLACEHOLDER_IMG = "/placeholder.svg";

export function mapApiCarToVehicle(c: ApiCar): Vehicle {
  // Extract equipment from API
  const equipment: string[] = Array.isArray(c.equipment) ? c.equipment : [];

  const engine =
    c.engine || equipment.find((item) => /electric motor|engine|cylinder|turbo/i.test(item)) || "";

  const drivetrain =
    c.driveTrain || equipment.find((item) => /^(FWD|RWD|AWD|4WD|4X4)$/i.test(item.trim())) || "";
  //   console.log("MAPPED VEHICLE:", {
  //   id: c.id,
  //   engine,
  //   drivetrain,
  //   equipment,
  // });
  return {
    id: String(c.id),
    vin: c.vin,
    stock: c.stockNumber ?? "",

    rank: 0,
    addedRank: 0,
    featured: false,
    featuredRank: null,

    title: `${c.year} ${c.make} ${c.model}`,
    subtitle: c.trim ?? "",

    year: c.year,
    make: c.make,
    model: c.model,
    trim: c.trim ?? "",

    price: c.price,
    mileage: c.odometer ?? null,

    bodyType: c.bodyStyle ?? "",
    condition: c.condition ?? "",

    engine,
    drivetrain,
    transmission: c.transmission ?? "",

    exteriorColor: c.exteriorColor ?? "",
    interiorColor: c.interiorColor ?? "",
    fuel: c.fuelType ?? "",

    doors: null,
    seating: null,

    photos: c.photos?.length ? c.photos : [PLACEHOLDER_IMG],
    comingSoon: !c.photos?.length,

    vehicleInfo: [],

    description: c.description ? [c.description] : [],

    features: equipment.length ? [{ title: "Vehicle Equipment", items: equipment }] : [],

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
