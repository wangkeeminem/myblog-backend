
const express = require('express')
const router = express.Router()


const login = require('./routers/login')
const register = require('./routers/register')

const viewArticle = require('./routers/viewArticle')
const publishArticle  = require('./routers/publishArticle')
const uploadImg = require ('./routers/uploadImg')
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


router.post('/uploadImg',(req,res)=>{
  uploadImg(req,res)
});

    // errno 即错误代码，0 表示没有错误。
    // //       如果有错误，errno != 0，可通过下文中的监听函数 fail 拿到该错误码进行自定义处理
    // "errno": 0,

    // // data 是一个数组，返回图片Object，Object中包含需要包含url、alt和href三个属性,它们分别代表图片地址、图片文字说明和跳转链接,alt和href属性是可选的，可以不设置或设置为空字符串,需要注意的是url是一定要填的。
    // "data": [
    //     {
    //         url: "图片地址",
    //         alt: "图片文字说明",
    //         href: "跳转链接"
    //     },
    //     {
    //         url: "图片地址1",
    //         alt: "图片文字说明1",
    //         href: "跳转链接1"
    //     },
    //     "……"
    // ]
module.exports=router