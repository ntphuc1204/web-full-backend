import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from 'module/auth/auth.module';
import { UserModule } from 'module/user/user.module';
import { UserService } from '../module/user/user.service';
@Module({
  imports: [AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
