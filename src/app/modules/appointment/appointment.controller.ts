import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendresponse";
import { Request, Response } from "express";





const createMyAppointment = catchAsync(async (req: Request, res: Response) => {
    
 sendResponse(res, {
        success: true,
        httpStatusCode: status.CREATED,
        message: 'Schedule created successfully',
        data:
    })
});