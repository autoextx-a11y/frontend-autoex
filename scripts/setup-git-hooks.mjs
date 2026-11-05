import { spawnSync } from "node:child_process";

const gitRoot = spawnSync("git", ["rev-parse", "--show-toplevel"], {
  encoding: "utf8",
});

if (gitRoot.error?.code === "ENOENT") {
  console.info("Skipping Git hook setup: the Git executable is not available.");
  process.exit(0);
}

if (gitRoot.error) {
  throw gitRoot.error;
}

if (gitRoot.status === 128) {
  console.info("Skipping Git hook setup: not running inside a Git repository.");
  process.exit(0);
}

if (gitRoot.status !== 0) {
  console.error(gitRoot.stderr.trim() || "Could not locate the Git repository root.");
  process.exit(gitRoot.status ?? 1);
}

const setup = spawnSync("git", ["config", "core.hooksPath", ".githooks"], {
  cwd: gitRoot.stdout.trim(),
  stdio: "inherit",
});

if (setup.error) {
  throw setup.error;
}

if (setup.status !== 0) {
  process.exit(setup.status ?? 1);
}
