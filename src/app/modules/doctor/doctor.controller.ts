import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { doctorService } from "./doctor.service";
import { sendResponse } from "../../shared/sendResponse";
import status from "http-status";
import { IQueryParams } from "../../interface/QueryBuilder.interface";

   const getAllDoctor=catchAsync(
    async(req:Request,res:Response)=>{
          const query = req.query;
        const result= await  doctorService.getAllDoctor(query as IQueryParams)
        sendResponse(res, {
            httpStatusCode:  status.OK,
            success: true,
            message: "Doctor  get successfully",
            data: result.data,
            meta: result.meta
        })
        return result
    }
     
   )
 const getDoctorById=catchAsync(async(req:Request,res:Response)=>{
    const doctorId= req.params.id
     const result= await doctorService.getDoctorById(doctorId as string)
     sendResponse(res,{
         httpStatusCode:  status.OK,
            success: true,
            message: "Doctor  get successfully",
            data: result,
     })
     return result

 })
const updateDoctor = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const payload = req.body;

        const updatedDoctor = await doctorService.updateDoctor(id as string, payload);

        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Doctor updated successfully",
            data: updatedDoctor,
        })
    }
)

const deleteDoctor = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;

        const result = await doctorService.deleteDoctor(id as string);

        sendResponse(res, {
            httpStatusCode: status.OK,
            success: true,
            message: "Doctor deleted successfully",
            data: result,
        })
    }
)



    export const doctorController={
        getAllDoctor,
        getDoctorById,
        updateDoctor,
        deleteDoctor
    }