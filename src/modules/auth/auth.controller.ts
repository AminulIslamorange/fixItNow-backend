import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import httpStatus from 'http-status';
import { authService } from "./auth.services";
import { sendResponse } from "../../utils/SendResponse";

const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body;
    const { accessToken, refreshToken } = await authService.loginUser(payload);

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false, 
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
    });

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'User Logged in Successfully',
        data: { accessToken, refreshToken } 
    });
});

// refreshToken 
const refreshToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.cookies; 
    const result = await authService.refreshToken(refreshToken);

    
    res.cookie("accessToken", result.accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24
    });

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Token Refreshed Successfully',
        data: result
    });
});


const getMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    
    const { id } = req.user as any;

    const result = await authService.getMe(id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'User profile retrieved successfully',
        data: result
    });
});

export const authController = { loginUser, refreshToken,getMe }; 