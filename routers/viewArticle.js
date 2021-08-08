

const Article = require('../models/article')
const PAGE_SIZE = 6

const route_tagChoice={
  '/':{},
  '/js':{"tagChoice.1": true},
  '/vue':{"tagChoice.2": true},
  '/other':{"tagChoice.3": true},
  '/fragment':{"tagChoice.4": true},
}

module.exports=function viewArticle(req,res,url){
  console.log('请求文章');
  const body = req.body
  
  article_num=(body.page+1)*PAGE_SIZE
  Article.find(route_tagChoice[url]).sort({'publishTime':-1}).limit(PAGE_SIZE).skip(article_num-PAGE_SIZE).then((resolve1,reject1)=>{
    if(reject1){
      return res.status(500).json({
        err_code: 500,
        message: 'Server error'
      })    
    }
    else if(resolve1){
      res.status(200).json({
        err_code: 0,
        message: 'OK',
        articles:resolve1
      })//登陆成功
    }
  })
}
