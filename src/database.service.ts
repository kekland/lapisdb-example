import { Datastore } from 'lapisdb';
import { News } from './news.model';
import { LevelDbAdapter } from 'lapisdb-level-adapter'
export class DatabaseService {
  static newsService: Datastore<News>;

  static initialize(directory: string) {
    const adapter = new LevelDbAdapter(News, { name: 'news', directory })
    this.newsService = new Datastore('news', adapter)
  }
}