import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { doctorScheduleCon} from "./doctorSchedule.controller";



const router = Router();

router.post("/create-my-doctor-schedule",
    checkAuth(Role.DOCTOR),
     doctorScheduleCon.createMyDoctorSchedule);
router.get("/my-doctor-schedules", checkAuth(Role.DOCTOR), doctorScheduleCon.getMyDoctorSchedules);
router.get("/", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), doctorScheduleCon.getAllDoctorSchedules);
router.get("/:doctorId/schedule/:scheduleId", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), doctorScheduleCon.getDoctorScheduleById);
router.patch("/update-my-doctor-schedule",
    checkAuth(Role.DOCTOR),
    doctorScheduleCon.updateMyDoctorSchedule);
router.delete("/delete-my-doctor-schedule/:id", checkAuth(Role.DOCTOR), doctorScheduleCon.deleteMyDoctorSchedule);

export const doctorScheduleRoutes = router;