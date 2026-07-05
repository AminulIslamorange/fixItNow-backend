import { Response } from "express";

export const sendResponce = <T>(res: Response, jsonData: {
    statusCode: number;
    success: boolean;
    message?: string;
    meta?: any;
    data: T;
}) => {
    res.status(jsonData.statusCode).json({
        success: jsonData.success,
        statusCode: jsonData.statusCode,
        message: jsonData.message,
        meta: jsonData.meta || null,
        data: jsonData.data,
    });
};