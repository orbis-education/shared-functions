import { describe, expect, it } from "vitest";

import {
  convertMilitaryTimeToStandardTime,
  convertMinutesToSeconds,
  convertStandardTimeToMilitaryTime,
  isEmpty,
  isValidURL
} from "../index.js";

describe("isEmpty", () => {
  it("returns true for nullish and blank string values", () => {
    expect(isEmpty(undefined)).toBe(true);
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty("   ")).toBe(true);
  });

  it("returns false for populated values", () => {
    expect(isEmpty("test")).toBe(false);
    expect(isEmpty(0)).toBe(false);
    expect(isEmpty(["value"])).toBe(false);
  });
});

describe("convertMilitaryTimeToStandardTime", () => {
  it("converts 24-hour times to 12-hour times", () => {
    expect(convertMilitaryTimeToStandardTime("00:05")).toBe("12:05 AM");
    expect(convertMilitaryTimeToStandardTime("13:30")).toBe("1:30 PM");
    expect(convertMilitaryTimeToStandardTime("23:59")).toBe("11:59 PM");
  });

  it("returns an empty string for invalid values", () => {
    expect(convertMilitaryTimeToStandardTime("25:00")).toBe("");
    expect(convertMilitaryTimeToStandardTime("abc")).toBe("");
  });
});

describe("convertStandardTimeToMilitaryTime", () => {
  it("converts 12-hour times to 24-hour times", () => {
    expect(convertStandardTimeToMilitaryTime("12:05 AM")).toBe("00:05");
    expect(convertStandardTimeToMilitaryTime("1:30 PM")).toBe("13:30");
    expect(convertStandardTimeToMilitaryTime("11:59 PM")).toBe("23:59");
  });

  it("returns an empty string for invalid values", () => {
    expect(convertStandardTimeToMilitaryTime("13:00 PM")).toBe("");
    expect(convertStandardTimeToMilitaryTime("hello")).toBe("");
  });
});

describe("convertMinutesToSeconds", () => {
  it("converts minutes and seconds into total seconds", () => {
    expect(convertMinutesToSeconds("5:30")).toBe(330);
    expect(convertMinutesToSeconds("00:45")).toBe(45);
  });

  it("returns zero for invalid values", () => {
    expect(convertMinutesToSeconds("5")).toBe(0);
    expect(convertMinutesToSeconds("1:-5")).toBe(0);
  });
});

describe("isValidURL", () => {
  it("accepts valid absolute URLs", () => {
    expect(isValidURL("https://example.com/path")).toBe(true);
  });

  it("rejects invalid URLs", () => {
    expect(isValidURL("not a url")).toBe(false);
  });
});
