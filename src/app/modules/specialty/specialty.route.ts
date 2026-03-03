import { Router } from "express";
import { ControllerSpe } from "./specialty.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";

import { multerUpload } from "../../config/multer.config";
import { validateRequest } from "../../middleware/validateRequest";
import { SpecialtyValidation } from "./specialty.validate";

 const router=Router()
 router.post('/', 
    // checkAuth(Role.ADMIN, Role.SUPER_ADMIN), 
    multerUpload.single("file"), 
    validateRequest(SpecialtyValidation.createSpecialtyZodSchema),
    ControllerSpe.specialtyController);
 validateRequest(SpecialtyValidation.createSpecialtyZodSchema )
 
   export { router as specialtyRoute}