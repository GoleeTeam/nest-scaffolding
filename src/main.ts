import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { RequestIdInterceptor } from './common/interceptors';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { bufferLogs: true });
    app.useLogger(app.get(Logger));
    app.useGlobalPipes(new ValidationPipe());

    const openApiConfig = new DocumentBuilder()
        .setTitle('Nest scaffolding')
        .setDescription('Example API description')
        .setVersion('1.0')
        .build();
    const openApiDocument = SwaggerModule.createDocument(app, openApiConfig);
    SwaggerModule.setup('api', app, openApiDocument);

    app.getHttpAdapter().getInstance().disable('x-powered-by');
    app.useGlobalInterceptors(new RequestIdInterceptor());
    const configService = app.get(ConfigService);
    await app.listen(configService.getOrThrow('APP_PORT'));
}

bootstrap();
