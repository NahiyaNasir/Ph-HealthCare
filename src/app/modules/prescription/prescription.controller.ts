import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { prescriptionService } from "./prescription.service";
import strict from "node:assert/strict";

const createPrescription = catchAsync(async (req: Request, res: Response) => {
    const user= req.user
    const payload= req.body
  const result = await prescriptionService.givePrescription(user,payload);
  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Doctor  get successfully",
    data: result,
  });
  return result;
});
const myPrescription = catchAsync(async (req: Request, res: Response) => {
        const user= req.user
  const result = await prescriptionService.myPrescription(user);
  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Doctor  get successfully",
    data: result,
  });
  return result;
});
const getAllPrescriptions = catchAsync(async (req: Request, res: Response) => {
  const result = await prescriptionService.allPrescriptions();
  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Doctor  get successfully",
    data: result,
  });
  return result;
});
const updatePrescription = catchAsync(async (req: Request, res: Response) => {
     const user= req.user
     const payload= req.body
     const prescriptionId=req.params.id
  const result = await prescriptionService.updatePrescription(user,prescriptionId as string,payload);
  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Doctor  get successfully",
    data: result,
  });
  return result;
});
const deletePrescription = catchAsync(async (req: Request, res: Response) => {
       const user= req.user
        const prescriptionId= req.params.id
  const result = await prescriptionService.deletePrescription(user,prescriptionId as string);
  sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Doctor  get successfully",
    data: result,
  });
  return result;
});
export const prescriptionController = {
  createPrescription,
  getAllPrescriptions,
  myPrescription,
  updatePrescription,
  deletePrescription,
};
