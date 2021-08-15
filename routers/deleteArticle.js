
const Article = require('../models/article.js')
const fs = require('fs')
const deleteImage = require('../utils/deleteImage')

module.exports = function deleteArticle(req,res){
  console.log('要删除的id是：',req.body.id);
  Article.findOneAndDelete({"_id":req.body.id}).then((resolve,reject)=>{
    if(reject){
      console.log('找不到被拒绝了');
      return res.status(500).json({
        err_code: 500,
        message: 'Server error'
      })    
    }
    else if(resolve){
      console.log('找到了')
      if(resolve.imagePathList.length){//如果存在图片资源 这是针对早期手动上传的情况
        console.log("早期手动上传的情况");
        console.log(resolve.imagePathList);
        deleteImage(res,resolve.imagePathList)
      } 
      else if (resolve.content.match(/(\/public\\article_album\\.*?)"/g)){
        const imageList=resolve.content.match(/(\/public\\article_album\\.*?)"/g)
        
        const imageListresult =imageList.map(item=>'.'+item.substring(0, item.lastIndexOf('"')))
        console.log(imageListresult);
        deleteImage(res,imageListresult)//将通过富文本上传的图片删除
      }
       return res.status(200).json({
        err_code: 0,
        message: 'delete OK',//登陆成功
      })
    }   
  }).catch(err=>console.log(err,'出错了'))
}

//删除图片函数
// function deleteImage(res,imagePathList){
//   for(let imagePath of imagePathList){
//     fs.unlinkSync(imagePath,err=>{
//       if (err) console.log('删除报错了');
//       return res.status(500).json({
//         err_code: 500,
//         message: 'Server error'
//       }) 
//     })
//   }
// }