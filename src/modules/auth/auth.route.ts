import { Router } from "express";
import { authController } from "./auth.controller";
import { auth } from "../../midlewares/auth";
import { Role } from "../../../prisma/generated/prisma/enums";


const router = Router();

router.post("/login", authController.loginUser);


router.post("/refresh-token", authController.refreshToken);

router.get("/me", auth(Role.ADMIN), authController.getMe);

export const authRoutes = router;