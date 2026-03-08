import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { reviewService } from "./review.service";
import status from "http-status";

const giveReview = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const user = req.user;
  const review = await reviewService.giveReview(user, payload);
  sendResponse(res, {
    success: true,
    httpStatusCode: status.CREATED,
    message: " review created successfully",
    data: review,
  });
});
const myReviews = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const user = req.user;
  const review = await reviewService.giveReview(user, payload);
  sendResponse(res, {
    success: true,
    httpStatusCode: status.CREATED,
    message: " review created successfully",
    data: review,
  });
});
const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const review = await reviewService.allReviews();
  sendResponse(res, {
    success: true,
    httpStatusCode: status.CREATED,
    message: " review created successfully",
    data: review,
  });
});
const updateReview = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const reviewId = req.params.id;
  const user = req.user;
  const review = await reviewService.updateReview(
    user,
    reviewId as string,
    payload,
  );
  sendResponse(res, {
    success: true,
    httpStatusCode: status.CREATED,
    message: " review created successfully",
    data: review,
  });
});
const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const reviewId = req.params.id;
  const user = req.user;

  await reviewService.deleteReview(user, reviewId as string);
  sendResponse(res, {
    success: true,
    httpStatusCode: status.CREATED,
    message: " review  deleted successfully",
  });
});
export const ReviewController = {
  giveReview,
  myReviews,
  getAllReviews,
  updateReview,
  deleteReview,
};
