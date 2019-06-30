import express from 'express'
import bodyParser from 'body-parser'
import { News } from './news.model';
import { Datastore, DatastoreManager } from 'lapisdb';
import { LevelDbAdapter } from 'lapisdb-level-adapter'

const bootstrap = async () => {
  const adapter = new LevelDbAdapter(News, { name: 'news', directory: './database' })
  const newsDatabase = new Datastore<News>('news', News, adapter)
  DatastoreManager.register(newsDatabase)

  // Create an Express server
  const app = express()

  app.use(bodyParser({ extended: true }))

  // Get all news
  app.get('/news', async (req, res) => {
    const news = await newsDatabase.getItems()
    res.status(200).send(news)
  })

  // Get a specific news article
  app.get('/news/:id', async (req, res) => {
    const article = await newsDatabase.get(req.params.id)
    res.status(200).send(article)
  })

  // Add a news article
  app.post('/news', async (req, res) => {
    const data = req.body
    if (data.body == null || data.author == null) {
      res.status(400).send({ message: 'Malformed body.' })
    }
    else {
      const newsItem = await new News(data.body, data.author, []).save()
      res.status(200).send(newsItem)
    }
  })

  // Add a comment under news article
  app.post('/news/:id/comment', async (req, res) => {
    const data = req.body
    if (data.body == null) {
      res.status(400).send({ message: 'Malformed body.' })
    }
    else {
      const newsItem = await newsDatabase.get(req.params.id)
      if (newsItem) {
        newsItem.comments.push(data.body)
        await newsItem.save()
        res.status(200).send(newsItem)
      }
      else {
        res.status(404).send({ message: 'Not found.' })
      }
    }
  })

  // Delete a news article
  app.delete('/news/:id', async (req, res) => {
    const id = req.params.id
    const removedNews = await newsDatabase.remove(id)
    res.status(200).send(removedNews)
  })

  app.listen(8080)
}

bootstrap()
