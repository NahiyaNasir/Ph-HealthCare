import { Router } from "express";
import { ControllerSpe } from "./specialty.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";

import { multerUpload } from "../../config/multer.config";
import { validateRequest } from "../../middleware/validateRequest";
import { SpecialtyValidation } from "./specialty.validate";

const router = Router();
router.post(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  multerUpload.single("file"),
  validateRequest(SpecialtyValidation.createSpecialtyZodSchema),
  ControllerSpe.createSpecialty,
);
validateRequest(SpecialtyValidation.createSpecialtyZodSchema);
router.get('/', ControllerSpe.getAllSpecialties);
router.delete('/:id', checkAuth(Role.ADMIN, Role.SUPER_ADMIN), ControllerSpe.deleteSpecialty);

export { router as specialtyRoute };
