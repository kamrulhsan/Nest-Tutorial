import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // ✅ Extract token from Authorization header
      ignoreExpiration: false, // ✅ Reject expired tokens
      secretOrKey: 'myStrongSecretKey', // ✅ This should match `JwtModule.register()` secret
    });
  }

  async validate(payload: any) {
    return { userId: payload.id, username: payload.username }; // ✅ Attach user data to request
  }
}
