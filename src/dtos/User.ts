import Joi from "joi";

export const CreateUserDto = Joi.object<UserType>()
  .keys({
    name: Joi.string().max(50).required(),
    birthage: Joi.string().isoDate().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })
  .options({ abortEarly: true });

export type UserType = {
  id: string;
  name: string;
  birthage: Date;
  email: string;
  password: string;
};
