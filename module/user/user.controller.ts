import { Controller, Get, Param, Body ,Post, Patch, Delete} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}
    @Get('/')
    getUser() {
        return this.userService.getUsers();  // Gọi phương thức getUser từ UserService
    }

    @Get("/:id")
    getUserid(@Param('id') id: string) {
        return this.userService.getUser(+id);  // Hoặc xử lý gì đó với id
    }

    @Post('/')
    async createUser(@Body() body: CreateUserDto) {
        const saltOrRounds = 10;
        // Đảm bảo băm mật khẩu đúng cách và đợi trước khi tiếp tục
        body.password = await bcrypt.hash(body.password, saltOrRounds);
        return this.userService.createUser(body); // Truyền body sau khi băm mật khẩu
    }

    @Patch('/:id')
    updateUser(@Body() body: CreateUserDto) {
        return body;
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(+id);
    }
}
