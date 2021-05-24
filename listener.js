const dgram = require("dgram");
const server = dgram.createSocket("udp4");
const { spawn } = require("child_process");
var posx = 0,
  posy = 0;
var vals;
server.on("message", (msg, rinfo) => {
  vals = `${msg}`;
  vals = vals.split(",");
  if (vals[0] == "a") {
    var tilt_side = vals[1];
    var tilt_front = vals[2];
    if (tilt_side > -4 && tilt_side < 4 && tilt_front > -4 && tilt_front < 4) {
      posx = 200;
      posy = 200;
    }
    if (tilt_side <= -4) {
      posx = 5;
    } else if (tilt_side >= 4) {
      posx = -5;
    }
    if (tilt_front <= -4) {
      posy = 5;
    } else if (tilt_front >= 4) {
      posy = -5;
    }
    var python = spawn("py", ["mouse.py", `changepos(${posx},${posy})`]);
  }
});
server.on("listening", () => {});
server.bind(4000);
