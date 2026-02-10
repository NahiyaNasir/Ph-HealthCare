import express, { Application, Request, Response } from "express";
import { specialtyRoute } from "./app/modules/specialty/specialty.route";
import { authRouter } from "./app/modules/Auth/auth.routes";
import { notFound } from "./app/middleware/notFound";




const app: Application = express();
// Middleware to parse JSON bodies
app.use(express.json());

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));
app.use("/api/va/specialty",specialtyRoute)
 app.use("/api/v1/auth",authRouter)

app.use(notFound)



// Basic route
app.get('/', async (req: Request, res: Response) => {

    
});

export default app;