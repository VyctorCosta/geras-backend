import Joi from "joi";

export type UserType = {
  id: string;
  name: string;
  birthage: Date;
  email: string;
  password: string;
  contacts: UserContactType[];
};

export type CreateUserDtoType = {
  name: string;
  birthage: string;
  email: string;
  password: string;
};

export type UserContactType = {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  user_id: string;
};

export type CreateUserContactDto = {
  first_name: string;
  last_name: string;
  phone: string;
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

export const CreateUserContactDto = Joi.object<UserContactType>().keys({
  first_name: Joi.string().max(50).required(),
  last_name: Joi.string().max(50).required(),
  phone: Joi.string()
    .max(18)
    .regex(/^\+\d{2} \d{2} \d \d{4}-\d{4}$/)
    .message("phone is invalid")
    .required(),
});
