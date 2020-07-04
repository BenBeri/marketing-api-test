import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import { AppLogger } from './logger/logger';
import * as path from "path";

declare const module: any;

export const PUBLIC_ROOT = path.join(__dirname, '..', 'public');

async function bootstrap() {
  const app = await NestFactory.create(AppModule,
    {
    logger: console,
    // cors: true,
  });
  app.useGlobalPipes(new ValidationPipe({
    // Show error messages
    disableErrorMessages: false,
    // If user send extra data from the dto the data will be stripped
    whitelist: true,
    // To enable auto-transformation, set transform to true
    transform: true,
  }));

  app.setGlobalPrefix('api');
  app.use(helmet());
  app.useLogger(app.get(AppLogger));
  await app.listen(process.env.PORT);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
