
// Server functions that serve inventory data to React pages.
import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";
import { notFound } from "@tanstack/react-router";
import { z } from "zod";
import {
  allVehicles,
  findVehicle,
  findVehicleByVin,
  toSummary,
} from "./inventory.server";

export const getInventory = createServerFn({ method: "GET" }).handler(
  async () => {
    const vehicles = await allVehicles();
    return vehicles.map(toSummary);
  },
);

export const getVehicle = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) =>
    z.object({ id: z.string().min(1).max(64) }).parse(data),
  )
  .handler(async ({ data }) => {
    const v = await findVehicle(data.id);

    if (!v) throw notFound();

    return v;
  });

// New: Find a vehicle using its VIN.
export const getVehicleByVin = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) =>
    z.object({ vin: z.string().min(1).max(32) }).parse(data),
  )
  .handler(async ({ data }) => {
    const v = await findVehicleByVin(data.vin);

    if (!v) throw notFound();

    return v;
  });

export const inventoryQuery = () =>
  queryOptions({
    queryKey: ["inventory"],
    queryFn: () => getInventory(),
    staleTime: 5 * 60_000,
  });

export const vehicleQuery = (id: string) =>
  queryOptions({
    queryKey: ["vehicle", id],
    queryFn: () => getVehicle({ data: { id } }),
    staleTime: 5 * 60_000,
  });

// New: Query a vehicle using its VIN.
export const vehicleByVinQuery = (vin: string) =>
  queryOptions({
    queryKey: ["vehicle", "vin", vin],
    queryFn: () => getVehicleByVin({ data: { vin } }),
    staleTime: 5 * 60_000,
  });
