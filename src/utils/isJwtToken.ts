import jwt from "jsonwebtoken";

export default function isJwtToken(value: unknown): boolean {
  if (typeof value !== "string") return false;

  try {
    const response = jwt.decode(value);
    if (response === null) return false;

    return true;
  } catch (err) {
    return false;
  }
}
