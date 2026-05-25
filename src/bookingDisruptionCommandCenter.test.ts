import { describe, expect, test } from "vitest";

import {
  bookingLane,
  guestCommunication,
  recoveryRisks,
  summary,
  verification
} from "./services/bookingDisruptionCommandCenterService";

describe("booking-disruption-command-center", () => {
  test("returns a recovery recommendation", () => {
    expect(summary().recommendation).toMatch(/guest|recovery|restore/i);
  });

  test("maps booking incidents and blockers", () => {
    expect(bookingLane().length).toBeGreaterThan(2);
    expect(recoveryRisks().some((risk) => risk.readiness === "red")).toBe(true);
  });

  test("verification posture stays buyer-readable", () => {
    expect(guestCommunication().every((packet) => packet.audience.length > 0)).toBe(true);
    expect(verification().some((item) => item.toLowerCase().includes("synthetic"))).toBe(true);
  });
});
