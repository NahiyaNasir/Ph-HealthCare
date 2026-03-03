import { Router } from "express";
import { doctorController } from "./doctor.controller";
import { Role } from "../../../generated/prisma/enums";
import { validateRequest } from "../../middleware/validateRequest";
import { updateDoctorZodSchema } from "./doctor.validation";

const router= Router()

 router.post("/getAllDoctor",doctorController.getAllDoctor)
 router.post("/:doctorId",doctorController.getDoctorById)
 router.patch("/:id",
  
    validateRequest(updateDoctorZodSchema), doctorController.updateDoctor);
router.delete("/:id",

    doctorController.deleteDoctor);

 export{router as doctorRoute}
