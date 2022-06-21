import { Module } from '@nestjs/common';
import { AtStrategy, RtStrategy } from 'src/auth/strategies';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, AtStrategy, RtStrategy],
})
export class UserModule {}
