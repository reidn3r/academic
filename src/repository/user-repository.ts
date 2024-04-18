// import { User } from "../models/User";
import { User } from '@prisma/client';
import { prisma } from '../db/prisma';

export class UserRepository {
    public async findUserByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findFirst({ where: { email: email } });
        if (user) {
            return user as User; // Casting user to User type
        } else {
            return null;
        }
    }
}