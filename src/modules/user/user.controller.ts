import { Request, Response, NextFunction } from "express";


import httpStatus from "http-status";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponce } from "../../utils/SendResponse";

const registerUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await userService.registerUserIntoDB(req.body);
    
    sendResponce(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'User registered successfully!',
        data: result
    });
});

export const userController = { registerUser };