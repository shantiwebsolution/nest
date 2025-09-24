import { IncomingMessage, ServerResponse } from 'http';
import { app } from '../src/main';

export default async (req: IncomingMessage, res: ServerResponse) => {
  await app.init();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
  const handler = app.getHttpAdapter().getInstance();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
  return handler(req, res);
};
