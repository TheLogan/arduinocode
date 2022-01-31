import { Board, Joystick } from "johnny-five";
const board = new Board({
  port: "COM4"
});

board.on("ready", function() {

  // Create a new `joystick` hardware instance.
  var joystick = new Joystick({
    pins: ["A0", "A1"]
  });

  joystick.on("change", function() {
    console.log("Joystick");
    console.log("  x : ", joystick.x);
    console.log("  y : ", joystick.y);
    console.log("--------------------------------------");
  });
});
