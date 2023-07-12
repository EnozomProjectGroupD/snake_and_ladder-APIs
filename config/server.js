import app from "../app.js";
import createTables from "../database/createTabels.js";
import http from 'node:http';
import consola from 'consola';

import { socker } from "./socker.js";

const port = process.env.PORT || 3000;
const socketPort = process.env.SOCKET_PORT || 3001;
const server = http.Server(app);

socker(server);
createTables();

app.listen(port, () => {
  consola.success(`Api listening on port ${port}!`);
});

server.listen(socketPort, () => {
  consola.success(`Socker listening on port ${socketPort}!`);
});
