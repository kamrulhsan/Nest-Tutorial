import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from 'bcryptjs';
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) {}

    async signup(username: string, password: string) {
        const hasPassword = await bcrypt.hash(password, 10);
        const user = this.userRepository.create({
            username,
            password: hasPassword,
        });
        await this.userRepository.save(user)
        return {message: 'success'}
    }

    async signin(username: string, password: string) {
        const user = await this.userRepository.findOneBy({username});

        if (!user || !await bcrypt.compare(password, user.password)) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const token = this.jwtService.sign({id: user.id, username: user.username} );
        return {access_token: token};
    }
}