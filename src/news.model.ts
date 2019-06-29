import { Model } from 'lapisdb'
import { DatabaseService } from './database.service';

export class News extends Model<News> {
  body: string;
  author: string;
  comments: string[];

  constructor(data: {body: string, author: string, comments: string[]}) {
    super(DatabaseService.newsService)

    this.body = data.body
    this.author = data.author
    this.comments = data.comments
  }
}