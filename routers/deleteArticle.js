const express = require('express')
const router = express.Router()
const Article = require('../models/article.js')
const fs = require('fs')
router.use(express.urlencoded({extended: true }))//post请求体
router.use(express.json())

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
      if(resolve.imagePathList){//如果存在图片资源
        deleteImage(res,resolve.imagePathList)
      }   
       return res.status(200).json({
        err_code: 0,
        message: 'delete OK',//登陆成功
      })
    }   
  }).catch(err=>console.log(err,'出错了'))
}

function deleteImage(res,imagePathList,){
  for(let imagePath of imagePathList){
    fs.unlinkSync(imagePath,err=>{
      if (err) console.log('删除报错了');
      return res.status(500).json({
        err_code: 500,
        message: 'Server error'
      }) 
    })
  }
}