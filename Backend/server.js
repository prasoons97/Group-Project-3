import express from "express";
import cors from "cors";
import routes from "./services.js";


const app = express();
const PORT = 3000;

// Enable cross-origin requests from frontend
app.use(cors());
// Parse incoming JSON requests
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