import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({description: 'Юзернейм пользователя'})
  readonly username: string;
  @ApiProperty({description: 'Пароль пользователя'})
  readonly password: string
  @ApiProperty({description: 'Имя пользователя'})
  readonly name: string
  @ApiProperty({description: 'Фамилия пользователя'})
  readonly surname: string
  @ApiProperty({description: 'Отчество пользователя'})
  readonly patronymic: string
  @ApiProperty({description: 'Телефон пользователя'})
  readonly phone: string
  @ApiProperty({description: 'Мэйл пользователя'})
  readonly email: string
}