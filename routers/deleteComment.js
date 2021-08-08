
const Article = require('../models/article.js')

const Comments = require('../models/comments')



module.exports=function deleteComment(req,res){
  const deleteId=req.body.id;
  const articleId=req.body.articleId;
  // res.end('hjjdaj')
  //文章留言模式删除
  console.log(deleteId);
  if(articleId)
  // Article.updateOne({"_id":articleId,'comments.publishtime':deleteId},{'comments':[]})
  Article.updateOne({"_id":articleId},{$pull:{"comments":{"publishtime":deleteId}}})
  
  .then((resolve,reject)=>{
    if(reject){
      return res.status(500).json({
        err_code: 500,
        message: 'Server error'
      })    
    }
    else if(resolve){
      res.status(200).json({
        err_code: 0,
        message: 'delete OK',//登陆成功
      })
    }   
  })
  else{
    Comments.findOneAndDelete({"_id":deleteId}).then((resolve,reject)=>{
      if(reject){
        return res.status(500).json({
          err_code: 500,
          message: 'Server error'
        })    
      }
      else if(resolve){
        res.status(200).json({
          err_code: 0,
          message: 'delete OK',//登陆成功
        })
      }   
    })
  }
}