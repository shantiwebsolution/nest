import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';

export default async function handler(req: any, res: any) {
  const app = await NestFactory.create(AppModule);
  await app.init();
  const expressInstance = app.getHttpAdapter().getInstance();
  expressInstance(req, res);
}
