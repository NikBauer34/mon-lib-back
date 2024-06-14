import { ApiProperty } from "@nestjs/swagger"

export class CreateMuseumDto {
  @ApiProperty({description: 'Юзернейм музея'})
  readonly username: string
  @ApiProperty({description: 'Пароль музея'})
  readonly password: string
  @ApiProperty({description: 'Названия музея'})
  readonly title: string
  @ApiProperty({description: 'Описание музея'})
  readonly description: string
  @ApiProperty({description: 'Длинное описание музея'})
  readonly descriptionExt: string
  @ApiProperty({description: 'Картинка музея'})
  readonly primaryImage: string
}