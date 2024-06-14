import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
  @ApiProperty({example: 'Искусство', description: 'Название категории'})
  readonly categoryName: string
}