import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const gitRoot = spawnSync("git", ["rev-parse", "--show-toplevel"], {
  encoding: "utf8",
});

if (gitRoot.error) {
  throw gitRoot.error;
}

if (gitRoot.status !== 0) {
  console.error("Could not find the Git repository root.");
  process.exit(gitRoot.status ?? 1);
}

const root = gitRoot.stdout.trim();
const staged = spawnSync("git", ["diff", "--cached", "--name-only", "--diff-filter=ACMR", "-z"], {
  cwd: root,
  encoding: "utf8",
});

if (staged.error) {
  throw staged.error;
}

if (staged.status !== 0) {
  process.exit(staged.status ?? 1);
}

const files = staged.stdout
  .split("\0")
  .filter((file) => /\.(?:[cm]?js|[cm]?ts|jsx|tsx)$/i.test(file));

if (files.length === 0) {
  process.exit(0);
}

const eslint = resolve(root, "node_modules", "eslint", "bin", "eslint.js");

if (!existsSync(eslint)) {
  console.error("ESLint is missing. Run npm install before committing.");
  process.exit(1);
}

const result = spawnSync(process.execPath, [eslint, ...files], {
  cwd: root,
  stdio: "inherit",
});

if (result.error) {
  throw result.error;
}

process.exit(result.status ?? 1);
