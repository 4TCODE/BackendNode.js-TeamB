import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{rawBody:true,cors:true,bodyParser:true});
  app.enableCors({origin:"*",methods:"*",allowedHeaders:"*",credentials:true});
  app.setGlobalPrefix("/api/v1");
  app.listen(3000);
}
bootstrap();