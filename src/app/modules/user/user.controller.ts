import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { userService } from "./user.service";

import status from "http-status";
import { sendResponse } from "../../shared/sendresponse";


 const createDoctor=catchAsync(
 async (req: Request, res: Response) => {
        const payload = req.body;

        const result = await userService.createDoctorService(payload);

        sendResponse(res, {
            httpStatusCode:  status.CREATED,
            success: true,
            message: "Doctor registered successfully",
            data: result,
        })
    }

 )
  const createAdmin= async(req:Request,res:Response)=>{
          const payload= req.body
    const result= await userService.createAdmin(payload)
   sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Admin created successfully",
    data: result,
  });
  }
  const createSuperAdmin= async(req:Request,res:Response)=>{
          const payload= req.body
    const result= await userService.createAdmin(payload)
   sendResponse(res, {
    httpStatusCode: status.CREATED,
    success: true,
    message: "Admin created successfully",
    data: result,
  });
  }


  export const userController={
    createDoctor,
    createAdmin,
    createSuperAdmin
  }