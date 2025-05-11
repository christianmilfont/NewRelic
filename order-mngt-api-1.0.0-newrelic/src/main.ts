import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import * as newrelic from 'newrelic';

import '../otel-bootstrap';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('WebShop API: Order Mngt API')
    .setDescription('WebShop API: Order Mngt API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
// Registra um log quando o servidor for iniciado
  newrelic.recordLogEvent({
    message: '🟢 Servidor iniciado',
    level: 'info',
    timestamp: Date.now(),
  });
  
  await app.listen(3002);
  require('newrelic');  // Adiciona o New Relic
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
