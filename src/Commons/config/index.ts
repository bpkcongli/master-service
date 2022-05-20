/* istanbul ignore file */
import * as dotenv from 'dotenv';
dotenv.config({path: `${process.cwd()}/.env`});

const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT;
const MONGO_URI = NODE_ENV !== 'development' ?
  NODE_ENV !== 'test' ?
    process.env.MONGO_URI_PROD : process.env.MONGO_URI_TEST :
  process.env.MONGO_URI_DEV;
const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY;

export {
  NODE_ENV,
  PORT,
  MONGO_URI,
  ACCESS_TOKEN_KEY,
};
