import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ){}
    @Post('signup')
    @UsePipes(new ValidationPipe({whitelist: true, transform: true}))
    signup(@Body() createUserDto: CreateUserDto) {
        return this.authService.signup(createUserDto.username, createUserDto.password);
    }

    @Post('login')
    login(@Body('username') username: string, @Body('password') password: string) {
        return this.authService.signin(username, password);
    }
}