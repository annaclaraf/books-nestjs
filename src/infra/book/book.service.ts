import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { BookDTO } from './dtos/book-dto';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async create(data: BookDTO) {
    const bookExists = await this.prisma.book.findFirst({
      where: {
        bar_code: data.bar_code
      }
    })

    if(bookExists) {
      throw new Error("Book alredy exists")
    }

    const book = await this.prisma.book.create({ 
      data 
    });

    return book;
  }

  async findAll() {
    const books = await this.prisma.book.findMany();

    return books;
  }

  async update(id: string, data: BookDTO) {
    const bookExists = await this.prisma.book.findUnique({
      where: { id }
    });

    if (!bookExists) {
      throw new Error('Book does not exists!');
    }

    const book = await this.prisma.book.update({
      data,
      where: { id }
    });

    return book;
  }

  async delete(id: string) {
    const bookExists = await this.prisma.book.findUnique({
      where: { id }
    });

    if (!bookExists) {
      throw new Error('Book does not exists!');
    }

    await this.prisma.book.delete({
      where: { id }
    });

    return 'Deleted';
  }
}
