import express from 'express'
import bodyParser from 'body-parser'
import { DatabaseService } from './database.service';
import { News } from './news.model';

const bootstrap = async () => {
  DatabaseService.initialize('./database')

  // Create an Express server
  const app = express()

  app.use(bodyParser({ extended: true }))
  
  app.get('/news', async (req, res) => {
    const news = await DatabaseService.newsService.getItems()
    res.status(200).send(news)
  })

  app.get('/news/:id', async (req, res) => {
    const singleNews = await DatabaseService.newsService.get(req.params.id)
    res.status(200).send(singleNews)
  })

  app.post('/news', async (req, res) => {
    const data = req.body
    if (data.body == null || data.author == null) {
      res.status(400).send({ message: 'Malformed body.' })
    }
    else {
      const newsItem = await new News(data).save()
      res.status(200).send(newsItem)
    }
  })

  app.delete('/news/:id', async (req, res) => {
    const id = req.params.id
    const removedNews = await DatabaseService.newsService.remove(id)
    res.status(200).send(removedNews)
  })

  app.listen(8080)
}

bootstrap()