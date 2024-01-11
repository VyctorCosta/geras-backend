import Joi from "joi";

export type EmailType = {
  id: string;
  email: string;
  phone: string;
  name: string;
  lastname: string;
  password: string;
};

export type CreateEmailDtoType = {
  email: string;
  phone: string;
  password: string;
};

export const CreateEmailDto = Joi.object<EmailType>()
  .keys({
    name: Joi.string().max(50).required(),
    lastname: Joi.string().max(50).required(),
    phone: Joi.string()
      .regex(/^[1-9]{2}(9[0-9])[0-9]{3}[0-9]{4}$/)
      .message("Phone number must be in the format 11999999999")
      .required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })
  .options({ abortEarly: true });

export const LoginEmailDto = Joi.object()
  .keys({
    login: Joi.string()
      .pattern(/^(?:\d{9,11}|[\w-.]+@([\w-]+\.)+[\w-]{2,4})$/)
      .message("Login must be a valid email or phone number")
      .required(),
    password: Joi.string().required(),
  })
  .options({ abortEarly: true });

export const ResetEmailDto = Joi.object()
  .keys({
    email: Joi.string().email().required(),
  })
  .options({ abortEarly: true });
