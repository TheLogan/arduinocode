import express from 'express'
import { ServoController } from './ServoController.js';
import bodyParser from 'body-parser'
import { iMove } from './helpers/interfaces.js';

const app = express()
const controller = new ServoController()
app.use(bodyParser.json())


app.post('/move', function (req, res) {
  let data:iMove = req.body;

  if(data.servo == null || data.pos == null || data.time == null) { 
    res.sendStatus(400);
    return;
  }

  controller.addMoveCommand(data.servo, data.pos, data.time);
  res.send();
})

app.get("/reset", (req, res) => {
  controller.resetPos();
  res.send();
})

app.post("/testmove", (req, res) => {
  let data:iMove = req.body;

  if(data.servo == null || data.pos == null) {
    res.sendStatus(400);
    return;
  }
  
  controller.testMove(data.servo, data.pos);
  res.send();
})

app.listen(3000, () => {
  console.log("listening on port 3000");
})