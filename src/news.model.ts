import { Model } from 'lapisdb'
import { DatabaseService } from './database.service';

export class News extends Model<News> {
  body: string;
  author: string;
  comments: string[];

  constructor(body: string, author: string, comments: string[]) {
    super(DatabaseService.newsService)

    this.body = body
    this.author = author
    this.comments = comments
  }
}