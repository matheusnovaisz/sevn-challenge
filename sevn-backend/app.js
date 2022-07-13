import express from "express";
import { router } from "./routes.js";

const app = express()
const PORT = 5000;

app.use("/", router)

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})