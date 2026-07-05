import { Router } from "express";
import { authController } from "./auth.controller";
import { auth } from "../../midlewares/auth";
import { Role } from "../../../prisma/generated/prisma/enums";

const router = Router();

router.post("/login", authController.loginUser);

// ২. রিফ্রেশ টোকেন পাওয়ার রাউট
router.post("/refresh-token", authController.refreshToken);

router.get("/me", auth(Role.ADMIN,Role.CUSTOMER,Role.TECHNICIAN), authController.getMe);

export const authRoutes = router;