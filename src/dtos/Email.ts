import Joi from "joi";

export type EmailType = {
  id: string;
  email: string;
  phone: string;
  name: string;
  lastname: string;
  password: string;
};

export const CreateEmailDto = Joi.object<EmailType>()
  .keys({
    name: Joi.string().max(50).required(),
    lastname: Joi.string().max(50).required(),
    phone: Joi.string().max(11).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })
  .options({ abortEarly: true });

export const LoginEmailDto = Joi.object()
  .keys({
    login: Joi.string().pattern(/^(?:\d{1,11}|[\w-\.]+@([\w-]+\.)+[\w-]{2,4})$/).required(),
    password: Joi.string().required(),
  })
  .options({ abortEarly: true });