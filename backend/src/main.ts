/* eslint-disable prettier/prettier */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as passport from 'passport';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as dotenv from "dotenv";

export const hostname = process.env.REACT_APP_HOST

async function bootstrap() {

	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());

	app.use(cookieParser());

	const config = new DocumentBuilder()
	  .setTitle('backend API')
	  .setDescription('trying swagger')
	  .setVersion('1.0')
	  .addTag('NestJS')
	  .build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	app.enableCors({
		origin:
		[
			"http://" + process.env.REACT_APP_HOST + ":" + process.env.PORT_CLIENTSIDE,//"10086",
			"http://" + process.env.REACT_APP_HOST + ":" + process.env.PORT_SERVERSIDE,//"10087",
		],
		credentials: true,
		exposedHeaders: ['randomString', 'X-XSRF-TOKEN', "Authorization"],
	});

	await app.listen(10087);
}
bootstrap();
