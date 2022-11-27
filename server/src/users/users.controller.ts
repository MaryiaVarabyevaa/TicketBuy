import {Body, Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {AuthService} from "../auth/auth.service";
import {LocalAuthGuard} from "../auth/local-auth.guard";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";


@Controller('user')
export class UsersController {
    constructor(
        private userService: UsersService,
        private authService: AuthService
    ) {}

    @Post('registration')
    create(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto); ;
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('block')
    async block(@Request() req) {
        return this.userService.blockUser(req.body.id);
    }

    @Post('changeRole')
    async changeRole(@Request() req) {
        return this.userService.changeRole(req.body.id);
    }

    @Post('updateInfo')
    async updateUserInfo(@Request() req) {
        const { id, firstName, lastName, email } = req.body;
        return this.userService.updateUserInfo(id, firstName, lastName, email);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @Get()
    getAll() {
        return this.userService.getAllUsers();
    }
}
