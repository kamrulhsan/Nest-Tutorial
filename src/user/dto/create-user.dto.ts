import { IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty({message: 'Usename is required'})
    username: string;

    @IsNotEmpty({message: 'Password is required'})
    @MinLength(6, {message: 'Password must be at least 6 characters'})
    password: string;
}