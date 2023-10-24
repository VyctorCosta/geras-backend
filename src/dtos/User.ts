import Joi from "joi";

export type UserType = {
  id: string;
  name: string;
  birthage: Date;
  email: string;
  password: string;
};

export const CreateUserDto = Joi.object<UserType>()
  .keys({
    name: Joi.string().max(50).required(),
    birthage: Joi.string().isoDate().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })
  .options({ abortEarly: true });

export const LoginUserDto = Joi.object()
  .keys({
    login: Joi.string().email().required(),
    password: Joi.string().required(),
  })
  .options({ abortEarly: true });
