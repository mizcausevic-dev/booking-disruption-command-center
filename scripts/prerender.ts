import fs from "node:fs";
import path from "node:path";

import {
  bookingLane,
  guestCommunication,
  payload,
  recoveryRisks,
  summary,
  verification
} from "../src/services/bookingDisruptionCommandCenterService";
import {
  renderBookingLane,
  renderDocs,
  renderGuestCommunication,
  renderOverview,
  renderRecoveryRisks,
  renderVerification
} from "../src/services/render";

const outputDir = path.resolve(__dirname, "..", "site");
fs.mkdirSync(outputDir, { recursive: true });
fs.mkdirSync(path.join(outputDir, "api"), { recursive: true });
fs.copyFileSync(path.resolve(__dirname, "..", "CNAME"), path.join(outputDir, "CNAME"));

const pages: Record<string, string> = {
  "index.html": renderOverview(),
  "booking-lane.html": renderBookingLane(),
  "recovery-risks.html": renderRecoveryRisks(),
  "guest-communication.html": renderGuestCommunication(),
  "verification.html": renderVerification(),
  "docs.html": renderDocs()
};

const rewrites: Array<[string, string]> = [
  ['href="/booking-lane"', 'href="booking-lane.html"'],
  ['href="/recovery-risks"', 'href="recovery-risks.html"'],
  ['href="/guest-communication"', 'href="guest-communication.html"'],
  ['href="/verification"', 'href="verification.html"'],
  ['href="/docs"', 'href="docs.html"']
];

for (const [filename, html] of Object.entries(pages)) {
  let content = html;
  for (const [from, to] of rewrites) {
    content = content.replaceAll(from, to);
  }
  fs.writeFileSync(path.join(outputDir, filename), content, "utf8");
}

const apiPayloads: Record<string, unknown> = {
  "api/dashboard/summary.json": summary(),
  "api/booking-lane.json": bookingLane(),
  "api/recovery-risks.json": recoveryRisks(),
  "api/guest-communication.json": guestCommunication(),
  "api/verification.json": verification(),
  "api/sample.json": payload()
};

for (const [filename, data] of Object.entries(apiPayloads)) {
  fs.mkdirSync(path.dirname(path.join(outputDir, filename)), { recursive: true });
  fs.writeFileSync(path.join(outputDir, filename), JSON.stringify(data, null, 2), "utf8");
}
