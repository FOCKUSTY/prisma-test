import type { PublicUser } from "types/user.types";

import type { UserCreateDto } from "./dto/user-create.dto";
import type { UserUpdateDto } from "./dto/user-update.dto";

import { PrismaService } from "services/prisma.service";

import { Injectable, NotFoundException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class Service {
  public constructor(private readonly prisma: PrismaService) {}

  public async get(): Promise<PublicUser[]> {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return users;
  }

  public async getOne(id: string): Promise<PublicUser> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  public async post(data: UserCreateDto): Promise<PublicUser> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    
    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }

  public async put(id: string, data: UserUpdateDto): Promise<PublicUser> {
    const updateData = { ...data };
    
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    const user = await this.prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }

  public async patch(id: string, data: UserUpdateDto): Promise<PublicUser> {
    return this.put(id, data);
  }

  public async delete(id: string): Promise<string> {
    await this.prisma.user.delete({
      where: { id },
    });

    return id;
  }
}