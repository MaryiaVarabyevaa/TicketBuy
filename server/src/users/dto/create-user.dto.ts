// объекты dto необходимы для обмена данными между подсистемами (клиент -сервре)
export class CreateUserDto {
    readonly name: string;
    readonly surname: string;
    readonly email: string;
    readonly password: string;
}