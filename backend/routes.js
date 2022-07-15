import express from 'express';
import {news} from './news.js'

export const router = express.Router()

router.get('/main-news', (req, res) => {
  const mainNews = news.filter(element => element.type === "main")
  return res.json(mainNews)
})

router.get('/secondary-news', (req, res) => {
  const secodnaryNews = news.filter(element => element.type === "secondary")
  return res.json(secodnaryNews)
})

router.get('/news/:id', (req, res) => {
  const post = news.find(element => element.id === Number(req.params.id))
  if(!post){
    return res.status(404).json({error: "News not found"})
  }
  return res.json(post)
})
