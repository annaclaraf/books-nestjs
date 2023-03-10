import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { BookService } from './book.service';
import { BookController } from './controllers/book.controller';

@Module({
  controllers: [BookController],
  providers: [BookService, PrismaService],
})
export class BookModule {}
