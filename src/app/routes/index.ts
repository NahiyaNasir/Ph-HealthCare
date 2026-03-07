import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { specialtyRoute } from "../modules/specialty/specialty.route";
import { authRouter } from "../modules/Auth/auth.routes";
import { doctorRoute } from "../modules/doctor/doctor.routes";
import { doctorScheduleRoutes } from "../modules/doctorSchedule/doctorSchedule.route";
import { scheduleRoutes } from "../modules/schedule/schedule.route";
import { AppointmentRoutes } from "../modules/appointment/appointment.route";


 const router=Router()

  router.use("/users", UserRoutes)
  router.use("/specialty",specialtyRoute)
   router.use("/auth",authRouter)
router.use("/doctors", doctorRoute)
router.use("/schedules", scheduleRoutes)
router.use("/doctor-schedules",doctorScheduleRoutes)

router.use("/appointments", AppointmentRoutes)


export const IndexRoutes = router;
   