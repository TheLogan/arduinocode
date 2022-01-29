// import { Board, Servo } from "johnny-five";
// import { RaspiIO} from "raspi-io";
import five from "johnny-five";

let Raspi = require("raspi-io").RaspiIO;
let board = new five.Board({
  io: new Raspi()
});

board.on("ready", function () {
  const controller = "PCA9685" ;
  // let led = new five.Led("P1-13");

  const a = new five.Servo({
    controller,
    pin: 0,
  });

  const b = new five.Servo({
    controller,
    range: [0, 180],
    pin: 1,
  });

  a.to(0);
  b.to(0);
});