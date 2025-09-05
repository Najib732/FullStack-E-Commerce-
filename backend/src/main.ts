import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  app.use(
    session({
      secret: 'my-secret',       
      resave: false,             
      saveUninitialized: false,  
      cookie: { maxAge: 3600000 }, // session expires in 1 hour
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
