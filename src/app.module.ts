import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { Todo } from './todo/entities/todo.entity';
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'todo',
      autoLoadEntities: true, // Automatically load entities
      synchronize: true, // Auto-sync DB schema (disable in production)
      logging: true, 
    }),
    AuthModule,
    TypeOrmModule.forFeature([Todo, User]),
  ],
  controllers: [AppController, TodoController, AuthController],
  providers: [AppService, TodoService, AuthService],
})
export class AppModule {}