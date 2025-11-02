import type { CreateUser } from "types/user.types";

import { ApiProperty } from "@nestjs/swagger";

export class UserCreateDto implements CreateUser {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email пользователя',
  })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Пароль пользователя',
  })
  password: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Имя пользователя',
    required: false,
  })
  name?: string;
}