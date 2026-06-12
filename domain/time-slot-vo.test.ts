import { describe, expect, it } from "vitest";
import { TimeSlot } from "./time-slot.vo";

describe("TimeSlot", () => {
  it("creates a slot when end is after start", () => {
    expect(
      () =>
        new TimeSlot({
          start: new Date("1975-09-15T14:00:00"),
          end: new Date("1975-09-15T14:45:00"),
        }),
    ).not.toThrow();
  });

  it("creates a slot of exactly two hours", () => {
    expect(
      () =>
        new TimeSlot({
          start: new Date("1975-09-15T14:00:00"),
          end: new Date("1975-09-15T16:00:00"),
        }),
    ).not.throw();
  });

  it("rejects a slot that ends before it starts", () => {
    expect(
      () =>
        new TimeSlot({
          start: new Date("2026-06-10"),
          end: new Date("2026-06-09"),
        }),
    ).toThrow("must end after it starts");
  });

  it("rejects a zero-duration slot", () => {
    expect(
      () =>
        new TimeSlot({
          start: new Date("2026-06-12T14:00:00"),
          end: new Date("2026-06-12T14:00:00"),
        }),
    ).toThrow("A time slot must have a duration greater than zero");
  });

  it("rejects a slot longer than two hours", () => {
    expect(
      () =>
        new TimeSlot({
          start: new Date("2026-06-12T14:00:00"),
          end: new Date("2026-06-12T17:00:00"),
        }),
    ).toThrow(/cannot exceed 2 hours/);
  });
});
