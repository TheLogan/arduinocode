// import { Board, Servo } from "johnny-five";
// import { RaspiIO} from "raspi-io";
const five = require("johnny-five");

let Raspi = require("raspi-io").RaspiIO;
let board = new five.Board({
  io: new Raspi()
});

board.on("ready", function () {
  const controller = "PCA9685" ;
  // let led = new five.Led("P1-13");

  const x = new five.Servo({
    controller,
    pin: 0,
  });

  const y = new five.Servo({
    controller,
    range: [0, 180],
    pin: 1,
  });

  x.to(90);
  y.to(90);

  board.repl.inject({
    // Allow limited on/off control access to the
    // Led instance from the REPL.
    x,
    y
  });
});