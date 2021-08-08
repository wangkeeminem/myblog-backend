

const Comments = require('../models/comments')


module.exports = function getcomments(req,res){
  Comments.find().sort({'updateTime':-1}).then((resolve,reject)=>{
    if(reject){
      return res.status(500).json({
        err_code: 500,
        message: 'Server error'
      })    
    }
    else if(resolve){
      res.status(200).json({
        err_code: 0,
        message: 'OK',//登陆成功
        Totalcomments:resolve
      })
    }
  })    
}