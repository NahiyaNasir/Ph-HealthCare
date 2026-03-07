import status from "http-status";
import { IQueryParams } from "../../interface/QueryBuilder.interface";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { scheduleService } from "./schedule.service";

const createSchedule = catchAsync(async (req, res) => {
      const payload = req.body;
    const schedule = await scheduleService.createSchedule(payload);
 sendResponse(res, {
        success: true,
        httpStatusCode: status.CREATED,
        message: 'Schedule created successfully',
        data:schedule
    })
});

const  getAllSchedule=catchAsync(async (req, res) => {
   const query = req.query;
    const result = await scheduleService.getSchedule(query as IQueryParams);
 sendResponse(res, {
        success: true,
        httpStatusCode: status.OK,
        message: 'Schedule retrieved successfully',
        data:result
    })
});
const  getScheduleById=catchAsync(async (req, res) => {
   const { id } = req.params;
    const schedule = await scheduleService.getScheduleById(id as string);
 sendResponse(res, {
        success: true,
        httpStatusCode: status.OK,
        message: 'Schedule retrieved successfully',
        data:schedule
    })
});
const  updateSchedule=catchAsync(async (req, res) => {
   const { id } = req.params;
      const payload = req.body;
    const  updatedSchedule = await scheduleService.updateSchedule(id as string,payload);
 sendResponse(res, {
        success: true,
        httpStatusCode: status.OK,
        message: 'Schedule updated successfully',
        data: updatedSchedule
    })
});
const  deleteSchedule=catchAsync(async (req, res) => {
 const { id } = req.params;
 const schedule = await scheduleService.deleteSchedule(id as string);
  sendResponse(res, {
        success: true,
        httpStatusCode: status.OK,
        message: 'Schedule deleted successfully',
        data:schedule
    });
});

export const scheduleController = {
  createSchedule,
  getAllSchedule,
  getScheduleById,
  updateSchedule,
  deleteSchedule
};