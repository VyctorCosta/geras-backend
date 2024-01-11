import { CreateEmailDtoType } from "@dtos/Email";
import { AccessDeniedError, ConflictError, NotFoundError } from "@middlewares/errorMiddleware";
import { InMemoryEmailRepository } from "@repositories/inMemory/inMemoryEmailRepository";
import isJwtToken from "@utils/isJwtToken";
import { afterEach, beforeEach, expect, it, describe } from "vitest";
import EmailService from "../services/emailService";

describe("create email", () => {
  const emailRepository = new InMemoryEmailRepository();
  const emailService = new EmailService(emailRepository);

  afterEach(() => {
    emailRepository.resetDatabase();
  });

  it("should create a email successfully", () => {
    const email: CreateEmailDtoType = {
      email: "lucacaz@email.com",
      phone: "81999999999",
      password: "123456",
    };

    expect(emailService.createEmail(email)).resolves.not.toBeInstanceOf(Error);
    expect(emailRepository.tb_email.length).toEqual(1);
  });

  it("should cannot create a email because email or phone already registered", async () => {
    const email: CreateEmailDtoType = {
      email: "lucacaz@email.com",
      phone: "81999999999",
      password: "123456",
    };

    await emailService.createEmail(email);

    const wrongEmail: CreateEmailDtoType = {
      email: "lucacaz@email.com",
      phone: "81888888888",
      password: "654321",
    };

    expect(emailService.createEmail(wrongEmail)).rejects.toBeInstanceOf(ConflictError);
    expect(emailRepository.tb_email.length).toEqual(1);
  });
});

describe("login email", () => {
  const emailRepository = new InMemoryEmailRepository();
  const emailService = new EmailService(emailRepository);

  beforeEach(() => {
    emailRepository.resetDatabase();
  });

  it("should login successfully and return a jwt token", async () => {
    const email: CreateEmailDtoType = {
      email: "lucacaz@email.com",
      phone: "81999999999",
      password: "123456",
    };

    await emailService.createEmail(email);

    expect(await emailService.loginUser("lucacaz@email.com", "123456")).toSatisfy(isJwtToken);
  });

  it("should not login because email not exists", () => {
    expect(emailService.loginUser("johndoe@email.com", "123456")).rejects.toBeInstanceOf(
      NotFoundError,
    );
  });

  it("should not login because password is wrong", () => {
    const email: CreateEmailDtoType = {
      email: "lucacaz@email.com",
      phone: "81999999999",
      password: "123456",
    };

    emailService.createEmail(email);

    expect(emailService.loginUser("lucacaz@email.com", "654321")).rejects.toBeInstanceOf(
      AccessDeniedError,
    );
  });
});
