import { Server } from "http";
import app from "./app";

let server: Server;
const port = process.env.PORT || 3000;

const Authi = async () => {
  try {
    server = app.listen(port, () => {
      console.log(`Authi is running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

Authi();
