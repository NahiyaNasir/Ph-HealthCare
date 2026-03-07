import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";

import { Request, Response } from "express";
import { appointmentService } from "./appointment.service";
import { sendResponse } from "../../shared/sendResponse";






const bookMyAppointment = catchAsync(async (req: Request, res: Response) => {
     const payload = req.body;
    const user = req.user;
    const appointment = await appointmentService.bookMyAppointment(user,payload);
 sendResponse(res, {
        success: true,
        httpStatusCode: status.CREATED,
        message: 'appointment created successfully',
        data:appointment,
    })

});
const getMyAppointments = catchAsync(async (req: Request, res: Response) => {
    const user = req.user;
    const appointments = await appointmentService.getMyAppointments(user);
    sendResponse(res, {
        success: true,
        httpStatusCode: status.OK,
        message: 'Appointments retrieved successfully',
        data: appointments
    });
});

const changeAppointmentStatus = catchAsync(async (req: Request, res: Response) => {
    const appointmentId = req.params.id;
    const payload = req.body;
    const user = req.user;

    const updatedAppointment = await appointmentService.changeAppointmentStatus(appointmentId as string, payload, user);
    sendResponse(res, {
        success: true,
        httpStatusCode: status.OK,
        message: 'Appointment status updated successfully',
        data: updatedAppointment
    });
});

const getMySingleAppointment = catchAsync(async (req: Request, res: Response) => {
    const appointmentId = req.params.id;
    const user = req.user;

    const appointment = await appointmentService.getMySingleAppointment(appointmentId as string, user);
    sendResponse(res, {
        success: true,
        httpStatusCode: status.OK,
        message: 'Appointment retrieved successfully',
        data: appointment
    });
});

const getAllAppointments = catchAsync(async (req: Request, res: Response) => {
    const appointments = await appointmentService.getAllAppointment();
    sendResponse(res, {
        success: true,
        httpStatusCode: status.OK,
        message: 'All appointments retrieved successfully',
        data: appointments
    });
});
const bookAppointmentWithPayLater = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const user = req.user;
    const appointment = await appointmentService.bookAppointmentWithPayLater(payload, user);
    sendResponse(res, {
        success: true,  
        httpStatusCode: status.CREATED,
        message: 'Appointment booked successfully with Pay Later option',
        data: appointment
    });
});

const initiatePayment = catchAsync(async (req: Request, res: Response) => {
    const appointmentId = req.params.id;
    const user = req.user;
    const paymentInfo = await appointmentService.initiatePayment(appointmentId as string, user);

    sendResponse(res, {
        success: true,
        httpStatusCode: status.OK,
        message: 'Payment initiated successfully',
        data: paymentInfo
    });
})

export const AppointmentController = {
bookMyAppointment,
    getMyAppointments,
    changeAppointmentStatus,
    getMySingleAppointment,
    getAllAppointments,
    bookAppointmentWithPayLater,
    initiatePayment,

}