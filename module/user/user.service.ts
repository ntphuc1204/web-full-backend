import { Injectable, Body } from '@nestjs/common';
import { PrismaService } from '../../src/prisma.service';
import { ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

    getUsers(): Promise<any> {
        return this.prisma.user.findMany();
    }
    getUser(id: number): Promise<any> {
        return this.prisma.user.findFirst({ where: { id } });
    }
    async createUser(body: CreateUserDto): Promise<any> {
        // Kiểm tra xem email đã tồn tại hay chưa
        const existingUser = await this.prisma.user.findUnique({
            where: { email: body.email },
        });
        if (existingUser) {
            // Nếu email đã tồn tại, ném lỗi ConflictException
            throw new ConflictException('Email already exists');
        }
        // Nếu email chưa tồn tại, tạo người dùng mới
        return this.prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: body.password,
            },
        });
    }
    async updateUser(body: CreateUserDto): Promise<any>{
        
    }
    deleteUser(id: number): Promise<any>{
        return this.prisma.user.delete({where: {id}})
    }
}
