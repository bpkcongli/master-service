import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
require('express-async-errors');
import container from '../container';
import {createConnection} from '../databases/mongodb/createConnection';
import SupplierAPI from '../../Interfaces/http/api/suppliers';
import Middleware from './middlewares';
import TokenVerificatorJwt from '../securities/TokenVerificatorJwt';
import PermissionVerificator
  from '../../Applications/securities/PermissionVerificator';
import SupplierPermissionACL from './permissionACLs/SupplierPermissionACL';

const createServer = () => {
  createConnection();
  const server = express();
  server.use(cors());
  server.use(cookieParser());
  server.use(express.json());
  const tokenVerificatorJwt = new TokenVerificatorJwt();

  const supplierPermissionVerificator = new PermissionVerificator(
      SupplierPermissionACL,
      '/api/v1/masters/suppliers',
  );
  const supplierMiddleware = new Middleware(
      tokenVerificatorJwt,
      supplierPermissionVerificator,
  );

  server.use(
      '/api/v1/masters/suppliers',
      supplierMiddleware.cookieExtractor,
      supplierMiddleware.permissionExtractor,
      SupplierAPI(container),
  );
  server.use(supplierMiddleware.errorHandler);

  return server;
};

export default createServer;
