import express from "express";
import cors from "cors";
import routes from "./services.js";


const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// connect endpoints
app.use("/", routes);

// test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});