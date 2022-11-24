import {Body, Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {AuthService} from "../auth/auth.service";
import {LocalAuthGuard} from "../auth/local-auth.guard";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";


@Controller('users')
export class UsersController {
    constructor(
        private userService: UsersService,
        private authService: AuthService
    ) {}

    @Post('registration')
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto);
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user.dataValues);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    // @Get()
    // getAll() {
    //     return this.userService.getAllUsers();
    // }
}
