interface ICreateUserDTO {
  name: string;
  password: string;
  email: string;
  driver_licence: string;
  avatar?: string;
  id?: string;
}

export { ICreateUserDTO }