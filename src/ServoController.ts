import { Board, Servo } from "johnny-five";
import { eServoId } from "./helpers/enums";
import { iCommand, iServoDets } from "./helpers/interfaces";
import { delay } from "./helpers/utils";
// const { Board, Servo } = five;
let Raspi = require("raspi-io").RaspiIO;

export class ServoController {
  board: Board;
  servoList: {[index: string]: iServoDets}={};
  // servoX: Servo | null = null;
  // servoY: Servo | null = null;
  boardReady = false;

  commandArr: iCommand[] = [];

  constructor() {
    this.board = new Board({
      io: new Raspi()
    });

    // this.board = new Board({ port: "COM4" });

    // this.board = new Board();
    this.board.on("ready", () => {
      this.servoList["x"] ={
        servo: new Servo({
            controller: "PCA9685",
            range: [0, 180],
            pin: 0,
            startAt: 90
          }),
          center: 90,
      }
      
      this.servoList["y"] = {
        servo: new Servo({
          controller: "PCA9685",
          range: [30, 110],
          pin: 1,
          startAt: 80
        }),
        center: 80
      }

      this.servoList["jaw"] = {
        servo: new Servo({
          controller: "PCA9685",
          range: [0, 120],
          pin: 2,
          startAt: 120
        }),
        center: 120
      }

      this.servoList["brow"] = {
        servo: new Servo({
          controller: "PCA9685",
          range: [0, 180],
          pin: 3,
          startAt: 90
        }),
        center: 90
      }

      this.boardReady = true;
    });
    this.servoLoop();
  }

  addMoveCommand(servo: eServoId, endPos: number, time: number) {
    if (!this.boardReady || this.servoList["x"].servo == null || this.servoList["y"].servo == null) return;
    if (this.commandArr.findIndex(x => x.find(y => y.servo === servo)) != -1) {
      this.commandArr = this.commandArr.map(x => x.filter(y => y.servo !== servo));
    }

    const startPos = this.servoList[servo].servo.position;
    let currentArr = [];
    for (let index = 0; index < time * 100; index++) {
      let currentPos = ((endPos - startPos) / (time * 100) * index) + startPos;
      currentArr.push(currentPos);
    }

    currentArr.push(endPos);
    for (let index = 0; index < currentArr.length; index++) {
      const step = currentArr[index];
      if (index < this.commandArr.length) {
        this.commandArr[index].push({ servo, pos: step });
      } else {
        this.commandArr.push([{ servo, pos: step }])
      }
    }


    return;
    // calculate how many steps need to be added
    // if steps already exist for that servo, purge all steps for that servo
    // add calculated steps to servo
  }

  resetPos() {
    if (!this.boardReady || this.servoList["x"].servo == null || this.servoList["y"].servo == null) return;

    for (const key in this.servoList) {
      if (Object.prototype.hasOwnProperty.call(this.servoList, key)) {
        const element = this.servoList[key];
        element.servo.to(element.center);
      }
    }
  }


  servoLoop = async () => {
    while (true) {
      await delay(10);
      if (!this.boardReady || this.servoList["x"].servo == null || this.servoList["y"].servo == null) continue;
      const commands = this.commandArr.shift();

      if (!commands?.length) continue;
      for (let index = 0; index < commands.length; index++) {
        const command = commands[index];
        this.servoList[command.servo].servo.to(command.pos);
      }
    }
  }

  testMove = (servo: eServoId, pos: number) => {
    this.servoList[servo].servo.to(pos);
  }
}