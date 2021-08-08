
const express = require('express')
const router = express.Router()


const login = require('./routers/login')
const register = require('./routers/register')

const viewArticle = require('./routers/viewArticle')
const publishArticle  = require('./routers/publishArticle')
const searchforArticle = require('./routers/searchforArticle')
const deleteArticle = require('./routers/deleteArticle')


const commentsResponseFun = require('./routers/comments')//对留言进行处理的函数 将文章和留言页合并为一个函数
const getcomments = require('./routers/getcomments')
const deleteComment = require('./routers/deleteComment')


const getVideos = require('./routers/getVideos')

router.use(express.urlencoded({extended: true }))//post请求体
router.use(express.json())


//用户注册
router.post('/register', (req, res) => {
  register(req, res)
})
//用户登录
router.post('/login',(req,res) => {
  login(req, res)
  
})
//用户发表文章
router.post('/publish', (req, res) => {
  publishArticle(req,res)
})

//主页面
router.post('/',(req,res)=>{
  console.log('进入主页面');
  viewArticle(req,res,'/')
})



//JS页面
router.post('/js',(req,res)=>{
  viewArticle(req,res,'/js')
})

//vue页面
router.post('/vue',(req,res)=>{
  viewArticle(req,res,'/vue')
})


//other页面
router.post('/other',(req,res)=>{
  viewArticle(req,res,'/other')
})


//随笔页面
router.post('/fragment',(req,res)=>{
  viewArticle(req,res,'/fragment')
})

//发布留言
router.post('/publishcomment',(req,res)=>{
  commentsResponseFun(req,res,'comments')
  })

//发布文章留言
router.post('/publisharticlecomment',(req,res)=>{
  commentsResponseFun(req,res,'article')
})

//获取留言页信息
router.get('/getcomments',(req,res)=>{
  getcomments(req,res)
  })

//删除文章
router.post('/deleteArticle',(req,res)=>{
  deleteArticle(req,res)
})
//删除留言
router.post('/deleteComment',(req,res)=>{
  deleteComment(req,res)
})

//搜索内容
router.post('/searchforArticle', (req, res) => {
  searchforArticle(req, res)
})

router.get('/getVideos',(req,res)=>{
  getVideos(req,res)
})

module.exports=router