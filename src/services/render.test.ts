import { describe, expect, test } from "vitest";

import {
  renderBookingLane,
  renderDocs,
  renderGuestCommunication,
  renderOverview,
  renderRecoveryRisks,
  renderVerification
} from "./render";
import {
  bookingIncidents,
  guestPackets,
  recoveryBlockers
} from "../data/sampleBookingDisruptions";

const renderers = [
  ["overview", renderOverview],
  ["booking-lane", renderBookingLane],
  ["recovery-risks", renderRecoveryRisks],
  ["guest-communication", renderGuestCommunication],
  ["verification", renderVerification],
  ["docs", renderDocs]
] as const;

describe("render", () => {
  test.each(renderers)("%s produces a full HTML document with nav", (_label, fn) => {
    const html = fn();
    expect(html.startsWith("<!DOCTYPE html>")).toBe(true);
    expect(html).toContain("</html>");
    expect(html).toContain("Booking Disruption Command Center");
    expect(html).toContain('href="/booking-lane"');
    expect(html).toContain('href="/docs"');
  });

  test("booking lane lists every incident with a risk tag", () => {
    const html = renderBookingLane();
    for (const incident of bookingIncidents) {
      expect(html).toContain(incident.incidentId);
    }
    expect(html).toContain('class="st needs"');
  });

  test("recovery risks list every blocker with readiness tags", () => {
    const html = renderRecoveryRisks();
    for (const block of recoveryBlockers) {
      expect(html).toContain(block.riskId);
    }
    expect(html).toContain('class="bad"');
    expect(html).toContain('Overbooking prevention');
  });

  test("guest communication shows packets and confidence scores", () => {
    const html = renderGuestCommunication();
    for (const packet of guestPackets) {
      expect(html).toContain(packet.packetId);
      expect(html).toContain(String(packet.confidenceScore));
    }
  });

  test("verification renders proof statements", () => {
    const html = renderVerification();
    expect(html).toContain("Verification");
  });

  test("docs page enumerates the route surface", () => {
    const html = renderDocs();
    expect(html).toContain("/recovery-risks");
    expect(html).toContain("/guest-communication");
  });
});
