import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]), // Register User entity
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secret: 'myStrongSecretKey', // ✅ Hardcoded secret key
          signOptions: { expiresIn: '1h' }, // Token expiry time
        }),
      ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService, JwtModule]
})
export class AuthModule {}