import { Request, response, Response } from "express";
import { specialtyService } from "./specialty.service";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";






 const specialtyController=catchAsync(
    async (req: Request, res: Response) => {
                 console.log( req.body);
                 console.log( req.file);

         const payload= {
            ...req.body,
            icon:req.file?.path
         }

        const result = await specialtyService.createSpecialty(payload);

        sendResponse(res, {
            httpStatusCode: 200,
            success: true,
            message: 'Specialty created successfully',
            data: result
        });
    }
)
const getAllSpecialties = catchAsync(
    async (req: Request, res: Response) => {
        const result = await specialtyService.getAllSpecialties();
        sendResponse(res, {
            httpStatusCode: 200,
            success: true,
            message: 'Specialties fetched successfully',
            data: result
        });
    }
)

const deleteSpecialty = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await specialtyService.deleteSpecialty(id as string);
        sendResponse(res, {
            httpStatusCode: 200,
            success: true,
            message: 'Specialty deleted successfully',
            data: result
        });
    }
)


 
  export const ControllerSpe={
    specialtyController,
    getAllSpecialties,
    deleteSpecialty
  }