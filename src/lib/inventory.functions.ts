// Server functions that serve inventory data to React pages.
import { createServerFn } from "@tanstack/react-start";
import { queryOptions } from "@tanstack/react-query";
import { notFound } from "@tanstack/react-router";
import { z } from "zod";

import { allVehicles, findVehicle, findVehicleByStock, toSummary } from "./inventory.server";

// Get all inventory vehicles.
export const getInventory = createServerFn({ method: "GET" }).handler(async () => {
  const vehicles = await allVehicles();
  return vehicles.map(toSummary);
});

// Get one vehicle using its numeric API ID.
export const getVehicle = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ id: z.string().min(1).max(64) }).parse(data))
  .handler(async ({ data }) => {
    const v = await findVehicle(data.id);

    if (!v) throw notFound();

    return v;
  });

// Get one vehicle using its stock number.
export const getVehicleByStock = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) =>
    z.object({ stock: z.string().trim().min(1).max(64) }).parse(data),
  )
  .handler(async ({ data }) => {
    const v = await findVehicleByStock(data.stock);

    if (!v) throw notFound();

    return v;
  });

// Query all inventory vehicles.
export const inventoryQuery = () =>
  queryOptions({
    queryKey: ["inventory"],
    queryFn: () => getInventory(),
    staleTime: 5 * 60_000,
  });

// Query one vehicle using its numeric API ID.
export const vehicleQuery = (id: string) =>
  queryOptions({
    queryKey: ["vehicle", id],
    queryFn: () => getVehicle({ data: { id } }),
    staleTime: 5 * 60_000,
  });

// Query one vehicle using its stock number.
export const vehicleByStockQuery = (stock: string) =>
  queryOptions({
    queryKey: ["vehicle", "stock", stock],
    queryFn: () => getVehicleByStock({ data: { stock } }),
    staleTime: 5 * 60_000,
  });
