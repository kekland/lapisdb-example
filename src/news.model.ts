import { Model } from 'lapisdb'

export class News extends Model<News> {
  body: string;
  author: string;
  comments: string[];

  constructor(body: string, author: string, comments: string[]) {
    super(News)

    this.body = body
    this.author = author
    this.comments = comments
  }
}