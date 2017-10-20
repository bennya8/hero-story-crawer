import fs from 'fs'
import { resolve } from 'path'
import getWord from '../cr/word'
import getWordNav from '../cr/word-nav'
import getWordDetail from '../cr/wordDetail'
import wordConfig from '../config/word'

const resolvePath = url => resolve(__dirname, url)

// 获取世界首页数据
const getWordIndex = async(ctx, next) => {
  let isNew = ctx.query.isNew
  let id = ctx.query.id // word id

  let filePath = resolvePath('../crawerdb/wordnav' + id + '.json')
  let exists = fs.existsSync(filePath)

  let result = null

  if (exists && !isNew) {
    result = await fs.readFileSync(filePath)
    result = result.toString()
    result = JSON.parse(result)
  } else {
    result = await getWord()
  }
  ctx.body = {
    success: true,
    data: result
  }
}

// 获取某个世界的顶部导航
const fetchWordNav = async(ctx, next) => {
  let isNew = ctx.query.isNew
  let id = ctx.query.id // word id
  let urlOpt = wordConfig[id]

  let filePath = resolvePath('../crawerdb/wordnav' + id + '.json')
  let exists = fs.existsSync(filePath)

  let result = null

  if (exists && !isNew) {
    result = await fs.readFileSync(filePath)
    result = result.toString()
    result = JSON.parse(result)
  } else {
    result = await getWordNav(urlOpt.url1, urlOpt.url2)
  }
  ctx.body = {
    success: true,
    data: result
  }
}

// 获取某个世界内容
const fetchWordDetail = async(ctx, next) => {
  let isNew = ctx.query.isNew
  let id = ctx.request.id // word id
  let contentUrl = ctx.request.url // 某个世界导航下面的内容

  let filePath = resolvePath('../crawerdb/worddetail' + id + '.json')
  let exists = fs.existsSync(filePath)

  let result = null

  if (exists && !isNew) {
    result = await fs.readFileSync(filePath)
    result = result.toString()
    result = JSON.parse(result)
  } else {
    result = await getWordDetail(contentUrl, id)
  }
  ctx.body = {
    success: true,
    data: result
  }
}

export default {
  getWordIndex,
  fetchWordNav,
  fetchWordDetail
}
