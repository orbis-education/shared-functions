import { afterEach, describe, expect, it, vi } from "vitest";

import {
  convertMilitaryTimeToStandardTime,
  convertMinutesToSeconds,
  convertStandardTimeToMilitaryTime,
  displayDateAndTime,
  displayYear,
  getCurrentDay,
  getCurrentMonth,
  getCurrentYear,
  getFirstItem,
  getLastItem,
  getParseInt,
  hasDecimalPlaces,
  hasEqualsProperty,
  hasNonEmptyProperty,
  isEmpty,
  isEmptyArray,
  isNonEmptyArray,
  isValidURL,
  removeForwardSlashes
} from "../index.js";

afterEach(() => {
  vi.useRealTimers();
});

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

describe("array helpers", () => {
  it("identifies empty and non-empty arrays", () => {
    expect(isNonEmptyArray([1, 2])).toBe(true);
    expect(isNonEmptyArray([])).toBe(false);
    expect(isNonEmptyArray("not an array")).toBe(false);

    expect(isEmptyArray([])).toBe(true);
    expect(isEmptyArray([1])).toBe(false);
    expect(isEmptyArray("not an array")).toBe(true);
  });

  it("returns the first and last populated array items", () => {
    expect(getFirstItem([{ id: 1 }, { id: 2 }])).toEqual({ id: 1 });
    expect(getFirstItem([{}])).toEqual({});
    expect(getLastItem([{ id: 1 }, { id: 2 }])).toEqual({ id: 2 });
    expect(getLastItem([])).toEqual({});
  });
});

describe("date helpers", () => {
  it("returns the current day, month, and year", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-21T14:30:00Z"));

    const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
    const adjustedDate = new Date(new Date().getTime() - timezoneOffset);

    expect(getCurrentDay()).toBe(adjustedDate.getDate());
    expect(getCurrentMonth()).toBe(adjustedDate.getMonth() + 1);
    expect(getCurrentYear()).toBe(adjustedDate.getFullYear());
  });

  it("formats date and time display values", () => {
    expect(displayDateAndTime("2026-07-21T09:05:00")).toBe("07/21/2026 09:05");
    expect(displayDateAndTime("2026-07-21T09:05:00", true)).toBe("7/21/2026 9:5");
    expect(displayYear("2026-07-21T09:05:00")).toBe("2026");
  });
});

describe("property and number helpers", () => {
  it("checks whether object properties exist and match values", () => {
    const record = { name: "Ada", role: "admin", emptyValue: "" };

    expect(hasNonEmptyProperty(record, "name")).toBe(true);
    expect(hasNonEmptyProperty(record, "emptyValue")).toBe(false);
    expect(hasNonEmptyProperty(record, "missing")).toBe(false);

    expect(hasEqualsProperty(record, "role", "admin")).toBe(true);
    expect(hasEqualsProperty(record, "role", "user")).toBe(false);
    expect(hasEqualsProperty(record, "missing", "admin")).toBe(false);
  });

  it("checks decimal places and parses integers", () => {
    expect(hasDecimalPlaces("10.5", 1)).toBe(true);
    expect(hasDecimalPlaces("10.55", 1)).toBe(false);
    expect(hasDecimalPlaces("10", 0)).toBe(true);
    expect(hasDecimalPlaces("abc", 2)).toBe(false);

    expect(getParseInt("42")).toBe(42);
    expect(getParseInt("42.9")).toBe(42);
    expect(getParseInt("")).toBeNull();
  });
});

describe("string helpers", () => {
  it("removes forward slashes from text", () => {
    expect(removeForwardSlashes("12/34/56")).toBe("123456");
    expect(removeForwardSlashes("no-slashes")).toBe("no-slashes");
    expect(removeForwardSlashes("")).toBe("");
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
