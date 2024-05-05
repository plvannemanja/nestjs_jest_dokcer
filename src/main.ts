import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
// const validationPipeService = require("@nestts/validation-pipes");
import {
  DocumentBuilder,
  SwaggerModule,
  SwaggerCustomOptions,
} from "@nestjs/swagger";
import { SwaggerTheme, SwaggerThemeNameEnum } from "swagger-themes";
import { AppModule } from "./app.module";

function configureSwagger(app: NestExpressApplication): void {
  // Use DocumentBuilder to create a new Swagger document configuration
  const config = new DocumentBuilder()
    .setTitle("NestJS API")
    .setDescription("Users and Cats")
    .setVersion("0.0.1")
    .addBearerAuth()
    .build();

  // Create a Swagger document using the application instance and the document configuration
  const document = SwaggerModule.createDocument(app, config);
  const theme = new SwaggerTheme();
  const options: SwaggerCustomOptions = {
    customSiteTitle: "tundrax docs",
    customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK),
    swaggerOptions: { persistAuthorization: true },
  };
  // Setup Swagger module with the application instance and the Swagger document
  SwaggerModule.setup("help", app, document, options);
}

async function bootstrap() {
  try {
    // validationPipeService();
    const app: NestExpressApplication =
      await NestFactory.create<NestExpressApplication>(AppModule);

    // Only enable Swagger on dev mode
    configureSwagger(app);

    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
    console.log(`Application is running on: ${await app.getUrl()}`);
  } catch (err) {}
}
bootstrap();
