import type { UpdateUser } from "types/user.types";

import { ApiProperty } from "@nestjs/swagger";

export class UserUpdateDto implements UpdateUser {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email пользователя',
    required: false,
  })
  email?: string;

  @ApiProperty({
    example: 'password123',
    description: 'Пароль пользователя',
    required: false,
  })
  password?: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Имя пользователя',
    required: false,
  })
  name?: string;
}