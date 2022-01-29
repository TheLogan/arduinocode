import { Servo } from "johnny-five";
import { eServoId } from "./enums.js";

export interface iMove {
  servo: eServoId;
  pos: number;
  time: number;
}

export type iCommand = iServoPos[];

export interface iServoPos {
  servo: eServoId;
  pos: number
}

export interface iServoDets {
  servo: Servo;
  center: number;
}