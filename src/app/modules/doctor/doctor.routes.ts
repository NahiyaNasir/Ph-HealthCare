import { Router } from "express";
import { doctorController } from "./doctor.controller";
import { Role } from "../../../generated/prisma/enums";
import { validateRequest } from "../../middleware/validateRequest";
import { updateDoctorZodSchema } from "./doctor.validation";

const router = Router();

router.get("/", doctorController.getAllDoctor);
router.get("/:id", doctorController.getDoctorById);
router.patch(
  "/:id",

  validateRequest(updateDoctorZodSchema),
  doctorController.updateDoctor,
);
router.delete(
  "/:id",

  doctorController.deleteDoctor,
);

export { router as doctorRoute };
