import jwt from "jsonwebtoken";
import env from "../utils/validateENV";

const private_key = env.PRIVATE_KEY;
const public_key = env.PUBLIC_KEY;

export function signInJWT(object: Object, options?: jwt.SignOptions) {
  return jwt.sign(object, private_key, {
    ...options,
    algorithm: "RS256",
  });
}

export function verifyJWT(token: string) {
  try {
    const decoded = jwt.verify(token, public_key);

    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    console.log(error);
    if (error.name === "TokenExpiredError") {
      return {
        valid: false,
        expired: true,
        decoded: null,
      };
    } else {
      return {
        valid: false,
        expired: false,
        decoded: null,
      };
    }
  }
}
