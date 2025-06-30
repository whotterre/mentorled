import { PrismaClient } from "@prisma/client";

interface CreateUserDto {
    name: string;
    email: string;
    password: string;
}

class UserService {
    constructor(private prisma: PrismaClient) {}
    /**
     * Creates a new user in the database.
     * @param data - The data for the new user.
     * @returns The created user object.
     */
    async createUser(data: CreateUserDto) {
        return this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
            }
        })
    }

    /**
     * Finds a user by email.
     * @param email - The email of the user to find.
     * @returns The user object if found, otherwise null.
     */
    async findUserByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: { email }
        });
    }

}

export default UserService;