import express from "express";
import DIContainer from "./di";

const app = express();

DIContainer.getInstance().then((di) => {
    // Middleware
    app.use(express.json());

    // Routes
    app.use("/api", di.router);

    // Error Handling
    app.use((req, res) => {
        res.status(404).json({ message: "Route not found" });
    });
}).catch((error) => {
    console.error("Failed to initialize dependencies:", error);
});


export default app;
