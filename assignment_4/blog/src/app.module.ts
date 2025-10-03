import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'database-1.cp6cimae4gel.ap-south-1.rds.amazonaws.com',
      port: 3306,
      username: 'root',
      password: 'swamibapa',
      database: 'blog_db',
      //entities: [],
      autoLoadEntities: true,
      synchronize: true, // Set to false in production
    }),
    UserModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
