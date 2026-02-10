import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { authService } from "./auth.service";



 const registerPatient=catchAsync(
    async (req: Request, res: Response) => {
         const payload= req.body
        //  console.log(payload);
        const result = await authService.registerUser(payload);
        sendResponse(res, {
            httpStatusCode: 200,
            success: true,
            message: 'user register successfully',
            data: result
        });
    }
)

const loginPatient = catchAsync(
    async (req: Request, res: Response) => {
        const payload = req.body;
        console.log(payload);
        const result = await authService.loginUser(payload);
        sendResponse(res, {
            httpStatusCode: 200,
            success: true,
            message: "User logged in successfully",
            data: result,
        })
    }
)
  export const authController={
    registerPatient,
    loginPatient
  }