import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
export class CreateUserDto{
    name: string;

    @IsEmail({},{message: "Sai định dạng Email, vd:a@gmail.com"})
    @IsString({message: "Email phỉa là chuỗi kí tự"})
    @IsNotEmpty({message: "Email không được để trống"})
    email: string;

    @IsString({message: "Mật khẩu phỉa là chuỗi kí tự"})
    @IsNotEmpty({message: "Mật khẩu không được để trống"})
    @MinLength(6, { message: "Mật khẩu tối thiểu 6 kí tự" })
    password: string;
    createAt: string;
    createUp: string;
}