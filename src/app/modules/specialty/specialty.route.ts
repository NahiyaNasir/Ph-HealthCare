import { Router } from "express";
import { ControllerSpe } from "./specialty.controller";

 const router=Router()
  router.post("/",ControllerSpe.specialtyController)
   export { router as specialtyRoute}