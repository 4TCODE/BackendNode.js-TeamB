import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{rawBody:true,cors:true,bodyParser:true});
  app.listen(3000);
  app.setGlobalPrefix('api/v1');
}
bootstrap();