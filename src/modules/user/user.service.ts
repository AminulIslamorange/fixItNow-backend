import bcrypt from "bcryptjs";

import config from "../../config";
import { RegisterUserPayload } from "./user.interface";
import { prisma } from "../../lib/prisma";


const registerUserIntoDB = async (payload: RegisterUserPayload) => {
    const {name, email, password, role, bio, profilePhoto } = payload;

    
    const isUserExist = await prisma.user.findUnique({ where: { email } });
    if (isUserExist) throw new Error("User already exists!");

    
    const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));

    
    const createdUser = await prisma.user.create({
        data: {name,
            email,
            password: hashedPassword,
            role: role || 'CUSTOMER',
            profile: {
                create: {
                    bio: bio || "",
                    avatarUrl: profilePhoto || "" 
                }
            }
        },
       
        omit: { password: true },
        include: { profile: true } 
    });

    return createdUser;
};

export const userService = { registerUserIntoDB };