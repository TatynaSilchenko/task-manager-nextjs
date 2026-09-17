import { describe, expect, it } from "vitest";

describe("smoke", () => {
  it("runs TypeScript tests", () => {
    const value: number = 1 + 1;

    expect(value).toBe(2);
  });
});
