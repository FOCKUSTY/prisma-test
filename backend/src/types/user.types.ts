export interface User {
  id: string;
  email: string;
  name?: string|null;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export type PublicUser = Omit<User, 'password'>;

export type CreateUser = {
  email: string;
  password: string;
  name?: string|null;
};

export type UpdateUser = Partial<CreateUser>;