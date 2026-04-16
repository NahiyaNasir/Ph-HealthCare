import { Router } from "express";
import { authController } from "./auth.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";


 const router= Router()
  router.post("/register",authController.registerPatient)

  router.post("/login",authController.loginPatient)
   router.post("/refresh-token",authController.getNewToken)
   router.post("/change-password",authController.changePassword)
   router.post("/logout",checkAuth(Role.ADMIN,Role.DOCTOR,Role.PATIENT,Role.SUPER_ADMIN),authController.logOut)
    router.post("/verifyEmail",authController.verifyEmail)
    router.post("/forget-password",authController.forgetPassword)
    router.post("/reset-password",authController.resetPassword)
  router.get("/me",checkAuth(Role.ADMIN,Role.DOCTOR,Role.PATIENT,Role.SUPER_ADMIN),authController.getME)
router.get("/login/google", authController.googleLogin);
router.get("/google/success", authController.googleLoginSuccess);
router.get("/auth/error", authController.handleOAuthError);
   export {router as authRouter}