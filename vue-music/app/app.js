//引入express框架
const express = require('express')
//引用axios
const axios = require('axios')
const { response, query } = require('express')
//创建网站服务器
const app = express()

//创建路由对象
const apiRouter = express.Router()

app.use('/songListApi', apiRouter)
apiRouter.get('/', (req, res) => {
  axios.get(' https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg', {
    headers: {
      origin: 'https://y.qq.com',
      referer: ' https://y.qq.com/portal/playlist.html'
    },
    params: req.query
  }).then(response => {
    res.send(response.data);
  }).catch(e => {
    res.send(e)
  })
})
/* app.get('/singerDetailApi/:id', (req, res) => {
  axios.get('https://u.y.qq.com/cgi-bin/musics.fcg', {
    headers: {
      origin: 'https://y.qq.com',
      referer: `https://y.qq.com/n/yqq/singer/${req.params.id}.html`
    },
    params: req.query
  }).then(response => {
    res.send(response.data)
  }).catch(e => {
    res.send(e)
  })
}) */

app.listen(3000);