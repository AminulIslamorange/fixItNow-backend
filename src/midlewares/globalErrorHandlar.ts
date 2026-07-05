import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Prisma } from "../../prisma/generated/prisma/client";

// import { Prisma } from "@prisma/client";
// import { PrismaClient, Prisma } from "../../prisma/generated/prisma";

export const globalErrorHandlar = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    let message = err.message || "Something went wrong!";

    // Prisma Error Handling
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
            statusCode = httpStatus.BAD_REQUEST;
            message = "Duplicate entry error (Email already exists)";
        }
    }

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        error: err.stack 
    });
};