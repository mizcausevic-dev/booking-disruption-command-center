import {
  bookingIncidents,
  guestPackets,
  recoveryBlockers
} from "../data/sampleBookingDisruptions";

export function summary() {
  return {
    incidents: bookingIncidents.length,
    urgentIncidents: bookingIncidents.filter((item) => item.risk === "red").length,
    blockedRecoveries: recoveryBlockers.filter((item) => item.readiness !== "green").length,
    fragileGuestPackets: guestPackets.filter((item) => item.status !== "green").length,
    recommendation:
      "Clear payment, inventory, and guest-message blockers first so recovery posture restores trust before the next arrival wave compounds service pressure."
  };
}

export function bookingLane() {
  return bookingIncidents;
}

export function recoveryRisks() {
  return recoveryBlockers;
}

export function guestCommunication() {
  return guestPackets;
}

export function verification() {
  return [
    "Booking incidents map to concrete downstream systems, not just notes in a support queue.",
    "Recovery blockers surface the proof needed before a guest-facing promise becomes unsafe.",
    "Guest communication posture ties service recovery to payment, inventory, and support readiness.",
    "The command center is buyer-readable and safe for embedded analytics tie-back.",
    "Synthetic data only; no real guest, booking, or payment records are included."
  ];
}

export function payload() {
  return {
    summary: summary(),
    incidents: bookingLane(),
    risks: recoveryRisks(),
    guestPackets: guestCommunication(),
    verification: verification()
  };
}
