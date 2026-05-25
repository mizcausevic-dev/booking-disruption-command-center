# Architecture

## Overview

`booking-disruption-command-center` is a lightweight TypeScript + Express control room for modeling the operating layer between booking disruptions, recovery blockers, guest communication posture, and service restoration readiness.

## Surfaces

- `overview`
  - active disruption incidents
  - blocked recovery dependencies
  - guest communication packets
  - governance recommendation
- `booking-lane`
  - disruption-by-disruption queue
  - owner routing
  - downstream impact
- `recovery-risks`
  - property, payment, inventory, and vendor blockers
  - required evidence
  - readiness posture
- `guest-communication`
  - recovery packets
  - response confidence score
  - next-contact timing
- `verification`
  - what the repo proves about booking recovery systems

## Data Model

- `BookingIncident`
  - property, channel, owner, risk, downstream impact, next action
- `RecoveryRisk`
  - blocker, source, required evidence, owner, readiness, impact area
- `GuestPacket`
  - audience, confidence score, reply window, blocker, decision note

## Design Principle

Booking recovery state should be inspectable by operations, guest experience, RevOps, and platform stakeholders. The system should explain:
- which disruption is under pressure right now
- which downstream blocker is still missing
- who owns the next move
- where guest trust or revenue risk is building
