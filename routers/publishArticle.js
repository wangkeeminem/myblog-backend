
const fs = require('fs')
const md5 = require('md5-nodejs')
const Article = require('../models/article.js')

const BASE_URL = require('./config')


module.exports=function publishArticle(req,res){
  const body = req.body
  const imgreg= new RegExp(`"data:image/.*?"`,'g')
  // console.log(imgreg);
  const imagePathList = body.imagePathList?body.imagePathList:[]//是否已有相关图片，如有使用，如没有 新建空的 存放文件路径 用于进行服务器文档的删除
  if (body.content.match(imgreg)){
  const imageList = body.content.match(imgreg)//找到匹配的data image即src内容
  for(let i of imageList)//每个i表示src值 
  {     
    const imageUrl = '/public'+ '/article_album/' +md5(i+Date.now()) +'.'+i.split(/\/|\+|\;/)[1]//这里src的两个""都已被替换掉，在下面repalce时要加上 加datanow防止文件重名误删
    // console.log(imageURL,'这是imageurl');
    imagePathList.push('.'+imageUrl);//将文件路径添加到imagePathList中
    body.content=body.content.replace(i,`"`+BASE_URL+imageUrl+`"`)//将路径替换为服务器路径
    const dataBuffer = Buffer.from(i.split(/base64,/)[1], 'base64'); //把base64码转成buffer对象，
    fs.writeFile('.'+imageUrl,dataBuffer,function(err){//用fs写入文件
      if(err){
        return res.status(500).json({
          err_code: 500,
          message: 'Server error'
        })  
      }else{
          console.log('写入成功！');
      }
  })
  }//把图片的base64内容用路径替换掉 在前端直接访问文件路径
}
if(imagePathList.length!=0)//将其添加到自己的属性中
body.imagePathList=imagePathList
// console.log(imagePathList);
// console.log(typeof(body));
if (body.editArticleId)//如果editArticleId已存在 ，那么更新（是编辑后的文章）
Article.findOneAndUpdate({'_id':body.editArticleId},body).then((resolve,reject)=>{
  if (reject) {
    console.log('hahahhaha');
    return res.status(500).json({
      err_code: 500,
      message: 'Server error'
    })       
  }
  else {
    res.status(200).json({
      err_code: 0,//没有问题
      message:'Register Sucessed',
      articles:'已收到文章投稿'
    })      
  }
})
  
else{
const newarticle = new Article(body)
  newarticle.save().then((resolve,reject)=>{
    if (reject) {
      console.log('hahahhaha');
      return res.status(500).json({
        err_code: 500,
        message: 'Server error'
      })       
    }
    else {
      res.status(200).json({
        err_code: 0,//没有问题
        message:'Register Sucessed',
        articles:'已收到文章投稿'
      })      
    }
  })
}

}