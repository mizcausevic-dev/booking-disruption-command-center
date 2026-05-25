export type RiskState = "red" | "yellow" | "green";

export type BookingIncident = {
  incidentId: string;
  property: string;
  channel: string;
  guestSegment: string;
  excerpt: string;
  owner: string;
  nextAction: string;
  risk: RiskState;
};

export type RecoveryRisk = {
  riskId: string;
  blocker: string;
  source: string;
  impactArea: string;
  requiredEvidence: string;
  owner: string;
  readiness: RiskState;
  note: string;
};

export type GuestPacket = {
  packetId: string;
  audience: string;
  confidenceScore: number;
  replyWindowMinutes: number;
  blocker: string;
  status: RiskState;
  decisionNote: string;
};

export const bookingIncidents: BookingIncident[] = [
  {
    incidentId: "BKG-401",
    property: "Harbor North Hotel",
    channel: "Direct web",
    guestSegment: "Conference arrivals",
    excerpt: "Payment auth retries are failing after a PMS sync and tomorrow's arrivals cannot self-check in without manual review.",
    owner: "Revenue operations",
    nextAction: "Validate payment retry patch and push guest-safe recovery notice by 7 PM.",
    risk: "red"
  },
  {
    incidentId: "BKG-402",
    property: "Mesa Trails Resort",
    channel: "OTA partner",
    guestSegment: "Weekend families",
    excerpt: "Room inventory is overcommitted across one OTA feed and two guest packages need relocation logic before confirmations go out.",
    owner: "Distribution manager",
    nextAction: "Freeze OTA inventory, rebuild allotment map, and stage fallback room offers.",
    risk: "red"
  },
  {
    incidentId: "BKG-403",
    property: "Cityline Suites",
    channel: "Call center",
    guestSegment: "Loyalty members",
    excerpt: "Storm-related transport delays changed arrival windows and support scripts are still using outdated check-in promises.",
    owner: "Guest experience lead",
    nextAction: "Refresh arrival script and resend recovery ETA blocks to support and SMS channels.",
    risk: "yellow"
  },
  {
    incidentId: "BKG-404",
    property: "Riverfront Apartments",
    channel: "Corporate account",
    guestSegment: "Long-stay business travelers",
    excerpt: "A cleaning vendor outage shortened turnover capacity and two corporate arrivals need staggered room-ready communication.",
    owner: "Operations manager",
    nextAction: "Re-slot housekeeping windows and update account contact with room-ready sequence.",
    risk: "yellow"
  }
];

export const recoveryBlockers: RecoveryRisk[] = [
  {
    riskId: "RR-21",
    blocker: "Payment authorization retry flow still unverified",
    source: "Booking engine / PMS sync",
    impactArea: "Check-in confidence",
    requiredEvidence: "Successful sandbox and production-safe retry traces with reservation correlation IDs.",
    owner: "Payments engineer",
    readiness: "red",
    note: "Guest recovery communication should not promise self-check-in until the retry path is verified."
  },
  {
    riskId: "RR-22",
    blocker: "Inventory override map missing OTA confirmation proof",
    source: "Channel manager",
    impactArea: "Overbooking prevention",
    requiredEvidence: "Snapshot of corrected room allotment plus OTA partner acknowledgment.",
    owner: "Distribution manager",
    readiness: "red",
    note: "Relocation posture remains unsafe if the OTA feed can still sell the exhausted room class."
  },
  {
    riskId: "RR-23",
    blocker: "Guest messaging macros not aligned to updated arrival windows",
    source: "CRM / messaging layer",
    impactArea: "Guest trust",
    requiredEvidence: "Approved SMS/email templates with revised check-in ETA blocks.",
    owner: "Guest communications",
    readiness: "yellow",
    note: "Support agents need the same arrival script as outbound guest communication to avoid promise drift."
  },
  {
    riskId: "RR-24",
    blocker: "Vendor outage playbook lacks account-owner escalation step",
    source: "Housekeeping vendor ops",
    impactArea: "Corporate retention",
    requiredEvidence: "Named escalation matrix and owner-approved fallback cleaning SLA.",
    owner: "Property operations",
    readiness: "yellow",
    note: "Corporate guests are less sensitive to delay than to unowned escalation paths."
  }
];

export const guestPackets: GuestPacket[] = [
  {
    packetId: "GP-11",
    audience: "Tonight's direct-booking arrivals",
    confidenceScore: 58,
    replyWindowMinutes: 45,
    blocker: "Payment retry validation still red",
    status: "red",
    decisionNote: "Do not send self-check-in instructions until payment fallback is cleared."
  },
  {
    packetId: "GP-12",
    audience: "Weekend OTA guests",
    confidenceScore: 64,
    replyWindowMinutes: 90,
    blocker: "Inventory override evidence incomplete",
    status: "yellow",
    decisionNote: "Send holding-language notice while relocation capacity stays staged but unconfirmed."
  },
  {
    packetId: "GP-13",
    audience: "Loyalty members with late arrivals",
    confidenceScore: 82,
    replyWindowMinutes: 30,
    blocker: "Support script refresh pending final approval",
    status: "yellow",
    decisionNote: "Guest confidence is recoverable if final messaging updates land before the next call-center shift."
  },
  {
    packetId: "GP-14",
    audience: "Corporate long-stay arrivals",
    confidenceScore: 91,
    replyWindowMinutes: 60,
    blocker: "Vendor fallback confirmed",
    status: "green",
    decisionNote: "Recovery posture is healthy once room-ready staging and account-owner communication stay synchronized."
  }
];
