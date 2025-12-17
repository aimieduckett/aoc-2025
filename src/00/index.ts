import fs from "node:fs";
import path from "node:path";

const DIAL_SIZE = 100; // 0 - 99
let lines: string[] = [];

try {
  const data = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
  lines = data.split("\n");
} catch {
  console.error("error");
}

/**
 * Part 1
 * Number of times the dial points at 0 after a rotation
 */

let dialPosition = 50;
let zeroCount = 0;

const wrapDialPosition = (value: number): number =>
  (value + DIAL_SIZE) % DIAL_SIZE;

for (const line of lines) {
  const dir = line[0];
  const amount = Number(line.slice(1));

  if (dir === "L") {
    dialPosition -= amount;
  } else {
    dialPosition += amount;
  }

  dialPosition = wrapDialPosition(dialPosition);

  if (dialPosition === 0) zeroCount++;
}

console.log("Zero count:", zeroCount);

/**
 * Part 2
 * Number of times the dial points at 0 after any click
 */

let dialPosition2 = 50;
let zeroCount2 = 0;

for (const line of lines) {
  const dir = line[0];
  const amount = Number(line.slice(1));
  const step = dir === "L" ? -1 : 1;

  // avoid modulo in nested loop
  for (let i = 0; i < amount; i++) {
    // move one fixed click
    dialPosition2 += step;

    // wrap the circluar dial
    if (dialPosition2 === DIAL_SIZE) dialPosition2 = 0; // 99 -> 100 -> 0
    else if (dialPosition2 === -1) dialPosition2 = DIAL_SIZE - 1; // 0 -> -1 -> 99

    if (dialPosition2 === 0) zeroCount2++;
  }
}

console.log("Zero count:", zeroCount2);

const totalIterations = lines.reduce(
  (sum, line) => sum + Number(line.slice(1)),
  0
);

console.log(totalIterations);
