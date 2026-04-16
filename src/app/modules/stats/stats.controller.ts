import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { StatsService } from "./stats.service";
import status from "http-status";

const getDashboardStatsData = catchAsync(async (req: Request, res: Response) => {
    const user = req.user;
    // console.log(user,"from stats");
    const result = await StatsService.getDashboardStats(user);
    // console.log(result,"from stats");

    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Stats data retrieved successfully!",
        data: result
    })
});

export const StatsController = {
    getDashboardStatsData
}