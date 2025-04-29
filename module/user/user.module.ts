import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../../src/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserService,PrismaService],  // Đảm bảo UserService được khai báo ở đây
  exports: [UserService,PrismaService],
})
export class UserModule {}
