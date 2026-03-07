import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";


import { IQueryParams } from "../../interface/QueryBuilder.interface";
import { Request, Response } from "express";
import { sendResponse } from "../../shared/sendResponse";
import { doctorScheduleService } from "./doctorSchedule.service";


const createMyDoctorSchedule = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;
    const user = req.user;
    const doctorSchedule = await doctorScheduleService.createMyDoctorSchedule(
      user,
      payload,
    );
    sendResponse(res, {
      success: true,
      httpStatusCode: status.CREATED,
      message: "Schedule created successfully",
      data: doctorSchedule,
    });
  },
);
const getMyDoctorSchedules = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const query = req.query;
  const result = await doctorScheduleService.getMyDoctorSchedules(
    user,
    query as IQueryParams,
  );
  sendResponse(res, {
    success: true,
    httpStatusCode: status.OK,
    message: "Doctor schedules retrieved successfully",
     
    data: result.data,
    meta:result.meta

  });
});
const getAllDoctorSchedules = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await doctorScheduleService.getAllDoctorSchedule(
    query as IQueryParams,
  );
  sendResponse(res, {
    success: true,
    httpStatusCode: status.CREATED,
    message: "Schedule retrieved successfully",
    data: result,
    // meta: result.meta,
  });
});

const getDoctorScheduleById = catchAsync(async (req: Request, res: Response) => {
  const doctorId = req.params.doctorId;
  const scheduleId = req.params.scheduleId;
  const doctorSchedule = await doctorScheduleService.getDoctorScheduleById(
    doctorId as string,
    scheduleId as string,
  );
  sendResponse(res, {
    success: true,
    httpStatusCode: status.OK,
    message: "Doctor schedule retrieved successfully",
    data: doctorSchedule,
  });
});
const updateMyDoctorSchedule = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const user = req.user;
  const updatedDoctorSchedule =
    await doctorScheduleService.updateMyDoctorSchedule(user, payload);
  sendResponse(res, {
    success: true,
    httpStatusCode: status.OK,
    message: "Doctor schedule updated successfully",
    data: updatedDoctorSchedule,
  });
});
const deleteMyDoctorSchedule = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = req.user;
  await doctorScheduleService.deleteMyDoctorSchedule(id as string, user);
  sendResponse(res, {
    success: true,
    httpStatusCode: status.OK,
    message: "Doctor schedule deleted successfully",
  });
});
export const doctorScheduleCon = {
  createMyDoctorSchedule,
  getMyDoctorSchedules,
  getAllDoctorSchedules,
  updateMyDoctorSchedule,
  deleteMyDoctorSchedule,
  getDoctorScheduleById,
};
