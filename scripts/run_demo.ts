import { payload, summary } from "../src/services/bookingDisruptionCommandCenterService";

console.log("booking-disruption-command-center demo");
console.log(JSON.stringify(summary(), null, 2));
console.log(JSON.stringify(payload().risks, null, 2));
