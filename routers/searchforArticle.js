const Article = require('../models/article.js')
const PAGE_SIZE = 6
module.exports = function searchforArticle (req,res){
  const body = req.body
  const reg = new RegExp(body.content,'ig')
  console.log('请求搜索',req.body);
  // res.end('hshshsh')
  article_num=(body.page+1)*PAGE_SIZE
  Article.find({'$or':[{'content':reg},{'title':reg}]}).sort({'publishTime':-1}).limit(PAGE_SIZE).skip(article_num-PAGE_SIZE).then((resolve,reject)=>{
    if (reject) {
      console.log('hahahhaha');
      return res.status(500).json({
        err_code: 500,
        message: 'Server error'
      })       
    }
    else if(resolve) {
      // console.log(resolve,'这是resolve');
     return res.status(200).json({
        err_code: 0,//没有问题
        message:'search Sucessed',
        searchResult:resolve
      })      
    }

  })
}