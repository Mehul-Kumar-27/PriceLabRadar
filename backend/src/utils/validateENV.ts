import "dotenv/config";
import { cleanEnv, num, port, str } from "envalid";

export default cleanEnv(process.env, {
  MONGO_CONNECTION_STRING: str(),
  PORT: port(),
  SALTFACTOR: num(),
  ACCESS_TOKEN_TIME: str(),
  REFRESH_TOKEN_TIME: str(),
  PUBLIC_KEY: str(),
  PRIVATE_KEY: str(),
});
