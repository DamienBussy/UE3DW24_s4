export class CreateUserDto {
    id: number;
    firstname: string;
    lastname: string;
    password: string;
    roles: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}
