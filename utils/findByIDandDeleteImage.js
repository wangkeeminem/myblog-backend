const Article = require('../models/article')
const deleteImage = require('../utils/deleteImage')
module.exports = //数据库与请求资源做对比 进行图片的的更新（删除增加）
function  findByIDandDeleteImage(ArticleId,imagePathList,body,res){//传入文章id 和 传来的图片地址列表 body用来对富文本的图片内容进行更新 res用于传给删除任务返回异常
  Article.findById({'_id':ArticleId}).then((resolve,reject)=>{
    if(resolve.imagePathList.length){//如果存在图片资源(这里需要check图片资源的引用是否有更新，如req.body中(imagePathList)不存在了 就删除服务器上的记录 这是是针对早期手动上传的情况
      console.log("早期手动上传的情况");
      const deleteImageList = []
      resolve.imagePathList.forEach(item=>{

        if (!imagePathList.includes(item)){//如果原文章中包含
          deleteImageList.push(item)//将要删除的项目加入list中
        }
      })
      deleteImage(res,deleteImageList)//删除之
    } 
       else if (resolve.content.match(/(\/public\\article_album\\.*?)"/g)){//如果使用富文本的方式加入服务器文件 则比对resolve和body中content的内容
      const imageList=resolve.content.match(/(\/public\\article_album\\.*?)"/g)     
      const imageListresult =imageList.map(item=>'.'+item.substring(0, item.lastIndexOf('"')))//原有的的imageurllist

      const newImageListresult = body.content.match(/(\/public\\article_album\\.*?)"/g).map(item=>'.'+item.substring(0, item.lastIndexOf('"')))//传入的imageurllist
      const deleteImageList = []
      imageListresult.forEach(item=>{

        if (!newImageListresult.includes(item)){//如果原文章中不包含
          deleteImageList.push(item)//将要删除的项目加入list中
        }
      })      
      deleteImage(res,deleteImageList)//将通过富文本上传的图片删除
    }
    
  })

} 