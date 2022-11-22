// объекты dto необходимы для обмена данными между подсистемами (клиент -сервре)
export class CreateUserDto {
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly password: string;
}