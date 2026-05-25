import {
  bookingLane,
  guestCommunication,
  recoveryRisks,
  summary,
  verification
} from "./bookingDisruptionCommandCenterService";

function layout(title: string, body: string) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <style>
      :root { color-scheme: dark; --bg: #081723; --panel: #142637; --text: #edf4f7; --muted: #9db4c2; --accent: #7ce4ff; --good: #55d49b; --warn: #ffcb63; --bad: #ff847c; }
      * { box-sizing: border-box; }
      body { margin: 0; font-family: "Segoe UI", Arial, sans-serif; background: radial-gradient(circle at top, #163449 0%, var(--bg) 56%); color: var(--text); }
      a { color: inherit; text-decoration: none; }
      .shell { width: min(1180px, calc(100vw - 40px)); margin: 28px auto 40px; }
      .topbar, .card, .table-wrap { background: rgba(20, 38, 55, 0.95); border: 1px solid rgba(157, 180, 194, 0.16); border-radius: 26px; box-shadow: 0 24px 80px rgba(0, 0, 0, 0.24); }
      .topbar { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 18px; padding: 28px 30px; }
      .brand { display: flex; gap: 18px; align-items: flex-start; max-width: 740px; }
      .badge { width: 58px; height: 58px; border-radius: 16px; display: grid; place-items: center; background: linear-gradient(135deg, rgba(124, 228, 255, 0.35), rgba(85, 212, 155, 0.18)); font-weight: 800; letter-spacing: 0.08em; }
      .eyebrow { color: var(--muted); text-transform: uppercase; letter-spacing: 0.2em; font-size: 12px; }
      h1, h2, h3, p { margin: 0; }
      h1 { margin-top: 6px; font: 700 42px/1.05 Georgia, serif; }
      .brand p { margin-top: 10px; color: var(--muted); max-width: 640px; font-size: 17px; line-height: 1.6; }
      nav { display: flex; flex-wrap: wrap; gap: 12px; align-content: flex-start; }
      nav a { padding: 12px 16px; border-radius: 999px; border: 1px solid rgba(157, 180, 194, 0.16); color: var(--muted); font-weight: 600; }
      nav a.active { color: var(--bg); background: linear-gradient(135deg, var(--accent), #8df0c9); }
      .section { padding: 30px; }
      .card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 18px; }
      .stat-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; margin-top: 22px; }
      .stat { padding: 18px; border-radius: 22px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(157, 180, 194, 0.12); }
      .stat label { display: block; color: var(--muted); font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; }
      .stat strong { display: block; margin-top: 10px; font-size: 36px; }
      .stat span { display: block; margin-top: 8px; color: var(--muted); line-height: 1.5; }
      .table-wrap { overflow: hidden; margin-top: 22px; }
      table { width: 100%; border-collapse: collapse; }
      th, td { padding: 16px 18px; text-align: left; border-bottom: 1px solid rgba(157, 180, 194, 0.12); vertical-align: top; }
      th { color: var(--muted); font-size: 12px; text-transform: uppercase; letter-spacing: 0.14em; }
      td { line-height: 1.5; }
      tr:last-child td { border-bottom: none; }
      .tag { display: inline-flex; padding: 6px 10px; border-radius: 999px; font-weight: 700; text-transform: uppercase; font-size: 11px; letter-spacing: 0.12em; }
      .tag.red { background: rgba(255, 132, 124, 0.18); color: var(--bad); }
      .tag.yellow { background: rgba(255, 203, 99, 0.18); color: var(--warn); }
      .tag.green { background: rgba(85, 212, 155, 0.18); color: var(--good); }
      .list { display: grid; gap: 14px; }
      .item { padding: 18px; border-radius: 20px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(157, 180, 194, 0.12); }
      .item p, .footer-note { margin-top: 8px; color: var(--muted); line-height: 1.6; }
      .section-grid { display: grid; grid-template-columns: 1.3fr 0.9fr; gap: 22px; margin-top: 22px; }
      code { color: var(--accent); }
      @media (max-width: 960px) { .section-grid, .stat-grid { grid-template-columns: 1fr; } h1, h2 { font-size: 34px !important; } .shell { width: min(100vw - 24px, 1180px); } .topbar, .section { padding: 22px; } }
    </style>
  </head>
  <body>
    <div class="shell">${body}</div>
  </body>
</html>`;
}

function topbar(active: string) {
  const links = [
    { href: "/", label: "Overview" },
    { href: "/booking-lane", label: "Booking Lane" },
    { href: "/recovery-risks", label: "Recovery Risks" },
    { href: "/guest-communication", label: "Guest Communication" },
    { href: "/verification", label: "Verification" },
    { href: "/docs", label: "Docs" }
  ];

  return `<div class="topbar"><div class="brand"><div class="badge">KG</div><div><div class="eyebrow">Booking Disruption Command Center</div><h1>Booking recovery and guest-trust control plane</h1><p>Disruption queues, blocker evidence, and guest communication posture in one operator surface for hospitality and travel teams.</p></div></div><nav>${links.map((link) => `<a class="${active === link.href ? "active" : ""}" href="${link.href}">${link.label}</a>`).join("")}</nav></div>`;
}

function stateClass(value: "red" | "yellow" | "green") {
  return value;
}

export function renderOverview() {
  const metrics = summary();
  return layout("Booking Disruption Command Center", `${topbar("/")}
    <div class="card section">
      <div class="eyebrow">Overview</div>
      <h2 style="margin: 6px 0 10px; font: 700 48px/1 Georgia, serif;">Bookings break when payment, inventory, and guest communication drift faster than the recovery system can respond.</h2>
      <p>This command center makes the operating layer explicit: which disruptions are live, which blockers still need proof, and which guest packets need intervention before service trust erodes further.</p>
      <div class="stat-grid">
        <div class="stat"><label>Incidents</label><strong>${metrics.incidents}</strong><span>Active disruption records tied to property, owner, and next action.</span></div>
        <div class="stat"><label>Urgent incidents</label><strong>${metrics.urgentIncidents}</strong><span>Red incidents where guest impact or revenue loss is already building.</span></div>
        <div class="stat"><label>Blocked recoveries</label><strong>${metrics.blockedRecoveries}</strong><span>Payment, inventory, and vendor blockers still waiting on proof.</span></div>
        <div class="stat"><label>Fragile guest packets</label><strong>${metrics.fragileGuestPackets}</strong><span>Guest-facing recovery messages that still need stronger backing.</span></div>
      </div>
      <div class="footer-note">${metrics.recommendation}</div>
    </div>`);
}

export function renderBookingLane() {
  return layout("Booking Disruption Command Center — Booking Lane", `${topbar("/booking-lane")}<div class="card section"><div class="eyebrow">Booking Lane</div><h2 style="margin: 6px 0 10px; font: 700 46px/1 Georgia, serif;">The queue should show which disruption is changing, why it matters, and who owns the next safe move.</h2><p>Each row ties booking context to guest impact, downstream systems, and the action needed to preserve recovery trust.</p></div><div class="table-wrap section"><table><thead><tr><th>Incident</th><th>Excerpt</th><th>Owner</th><th>Next Action</th><th>Risk</th></tr></thead><tbody>${bookingLane().map((item)=>`<tr><td><strong>${item.property}</strong><br />${item.incidentId}<br />${item.channel} · ${item.guestSegment}</td><td>${item.excerpt}</td><td>${item.owner}</td><td>${item.nextAction}</td><td><span class="tag ${stateClass(item.risk)}">${item.risk}</span></td></tr>`).join("")}</tbody></table></div>`);
}

export function renderRecoveryRisks() {
  return layout("Booking Disruption Command Center — Recovery Risks", `${topbar("/recovery-risks")}<div class="card section"><div class="eyebrow">Recovery Risks</div><h2 style="margin: 6px 0 10px; font: 700 46px/1 Georgia, serif;">Most booking failures are actually recovery-proof failures with a missing owner or evidence packet.</h2><p>This lane maps blocker sources to required evidence, owner lanes, readiness, and the impact area if recovery stays unresolved.</p></div><div class="section-grid"><div class="table-wrap section"><table><thead><tr><th>Blocker</th><th>Required Evidence</th><th>Owner</th><th>Readiness</th></tr></thead><tbody>${recoveryRisks().map((item)=>`<tr><td><strong>${item.blocker}</strong><br />${item.source}<br />${item.impactArea}</td><td>${item.requiredEvidence}</td><td>${item.owner}</td><td><span class="tag ${stateClass(item.readiness)}">${item.readiness}</span></td></tr>`).join("")}</tbody></table></div><div class="card section"><div class="eyebrow">Dependency Blockers</div><h3>Where guest recovery is likely to stall.</h3><div class="list">${recoveryRisks().map((item)=>`<div class="item"><strong>${item.riskId} · ${item.owner}</strong><p>${item.note}</p><span>${item.source} · ${item.impactArea}</span></div>`).join("")}</div></div></div>`);
}

export function renderGuestCommunication() {
  return layout("Booking Disruption Command Center — Guest Communication", `${topbar("/guest-communication")}<div class="card section"><div class="eyebrow">Guest Communication</div><h2 style="margin: 6px 0 10px; font: 700 46px/1 Georgia, serif;">Guest posture matters when the next arrival or support window is shorter than the next recovery cycle.</h2><p>This lane surfaces which communication packets are safe, which still need blockers cleared, and where service recovery needs immediate intervention.</p></div><div class="card-grid" style="margin-top: 22px;">${guestCommunication().map((packet)=>`<div class="card section"><div class="eyebrow">${packet.packetId}</div><h3>${packet.audience}</h3><div class="stat-grid" style="grid-template-columns: repeat(2, minmax(0, 1fr)); margin-top: 0;"><div class="stat"><label>Confidence</label><strong style="font-size: 30px;">${packet.confidenceScore}%</strong><span>${packet.audience}</span></div><div class="stat"><label>Status</label><strong style="font-size: 30px;"><span class="tag ${stateClass(packet.status)}">${packet.status}</span></strong><span>${packet.blocker}</span></div></div><div class="footer-note">${packet.replyWindowMinutes} minutes to next reply window · ${packet.decisionNote}</div></div>`).join("")}</div>`);
}

export function renderVerification() {
  return layout("Booking Disruption Command Center — Verification", `${topbar("/verification")}<div class="card section"><div class="eyebrow">Verification</div><h2 style="margin: 6px 0 10px; font: 700 46px/1 Georgia, serif;">What this repo proves about disruption recovery, guest trust, and hospitality operations.</h2><div class="list">${verification().map((item)=>`<div class="item"><strong>${item}</strong></div>`).join("")}</div></div>`);
}

export function renderDocs() {
  return layout("Booking Disruption Command Center — Docs", `${topbar("/docs")}<div class="card section"><div class="eyebrow">Docs</div><h2 style="margin: 6px 0 10px; font: 700 46px/1 Georgia, serif;">A command center for booking disruptions, recovery blockers, and guest-safe operational trust.</h2><p>This repo models the operating layer between disruption intake and service recovery: booking visibility, downstream evidence, communication posture, vendor pressure, and operator-safe interventions.</p><div class="footer-note">Routes: <code>/</code> · <code>/booking-lane</code> · <code>/recovery-risks</code> · <code>/guest-communication</code> · <code>/verification</code> · <code>/docs</code></div></div>`);
}
