import fs from "node:fs";

const DIAL_SIZE = 100; // 0 - 99
let lines: string[] = [];

try {
  const data = fs.readFileSync("input.txt", "utf8");
  lines = data.split("\n");
} catch {
  console.error("error");
}

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
