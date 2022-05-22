require('dotenv');
import {PORT} from './Commons/config';
import createServer from './Infrastructures/http/createServer';
import container from './Infrastructures/container';

const start = () => {
  const server = createServer(container);
  server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
};

start();
