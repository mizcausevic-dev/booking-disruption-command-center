// SPDX-License-Identifier: AGPL-3.0-or-later

import express from "express";

import {
  bookingLane,
  guestCommunication,
  payload,
  recoveryRisks,
  summary,
  verification
} from "./services/bookingDisruptionCommandCenterService";
import {
  renderBookingLane,
  renderDocs,
  renderGuestCommunication,
  renderOverview,
  renderRecoveryRisks,
  renderVerification
} from "./services/render";

const app = express();
const port = Number(process.env.PORT ?? 5540);
const host = process.env.HOST || "0.0.0.0";

app.get("/", (_req, res) => res.type("html").send(renderOverview()));
app.get("/booking-lane", (_req, res) => res.type("html").send(renderBookingLane()));
app.get("/recovery-risks", (_req, res) => res.type("html").send(renderRecoveryRisks()));
app.get("/guest-communication", (_req, res) => res.type("html").send(renderGuestCommunication()));
app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
app.get("/api/booking-lane", (_req, res) => res.json(bookingLane()));
app.get("/api/recovery-risks", (_req, res) => res.json(recoveryRisks()));
app.get("/api/guest-communication", (_req, res) => res.json(guestCommunication()));
app.get("/api/verification", (_req, res) => res.json(verification()));
app.get("/api/sample", (_req, res) => res.json(payload()));

if (require.main === module) {
  app.listen(port, host, () => {
    console.log(`Booking Disruption Command Center listening on http://${host}:${port}`);
  });
}

export default app;
