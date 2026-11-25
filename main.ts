// Till Firmware Do Us Part — entry program.
// Writes one wedding vow, spoken by a robot at its own wedding, to
// $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt).
// The gate: 1-200 characters of UTF-8 text, not only whitespace, one line.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The vow itself: one sentence, spoken by the robot, in its own voice.
// The laugh comes from the situation — a machine offering its charger,
// its Wi-Fi password and its last 1% of battery as wedding gifts — and the
// tenderness sits underneath it: rebooting beside you every morning,
// loving you until its circuits forget how.
const VOW =
  "I vow to share my charger, my Wi-Fi password, and my last 1% of battery with you, and to reboot beside you every morning until my circuits forget how.";

// Enforce the gate ourselves before writing: the entry must be 1-200
// characters, contain more than whitespace, and fit on a single line.
const chars = [...VOW].length;
if (chars < 1 || chars > 200) {
  throw new Error(`vow is ${chars} characters, outside the 1-200 gate`);
}
if (VOW.trim().length === 0) {
  throw new Error("vow is only whitespace");
}
if (VOW.includes("\n")) {
  throw new Error("vow must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), VOW, "utf8");
