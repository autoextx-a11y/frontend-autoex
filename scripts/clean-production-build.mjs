import { rmSync } from "node:fs";

for (const directory of [".output", "dist", "dist-ssr"]) {
  rmSync(directory, { recursive: true, force: true });
}
