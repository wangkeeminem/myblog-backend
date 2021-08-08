// /publishcomment 为留言模式  /publisharticlecomment 为文章留言模式
// const express = require('express')
// const router = express.Router()
const Article = require('../models/article')
const Comments = require('../models/comments')
const replyCommentTopic = require('../utils/replyfunction')
const MODE = {
  comments:{url:'/publishcomment',database:Comments},
  article:{url:'/publisharticlecomment',database:Article}
}
//mode为模式 可选comment article均为字符串格式 皆对象的属性名

module.exports =function (req,res,publishmode){
   const body = req.body 
  if ((body.mode==publishmode)&&(body.comments.layer==0)){//发主题帖模式
    // console.log('这是主题帖模式');
    const newComments = new Comments(body.comments)//更新
    newComments.save().then((resolve,reject)=>{
      if (reject) {
        console.log('wuwuwuwuw');
        return res.status(500).json({
          err_code: 500,
          message: 'Server error'
        })       
      }
      else {//save新留言成功
        res.status(200).json({
          err_code: 0,//没有问题
          message:'Register Sucessed',
          articles:`已收到留言`
        })  
        // console.log(resolve)    
      }    
    
    })
  }
  else if ((body.mode!=publishmode)&&(body.comments.layer==0)){//文章中发主题帖模式
    console.log('文章中的主题帖模式');
    console.log(body.mode);//注意这人的mode前端定义的是文章publishtime 晕死我算了
  //  const  body=body.comments
  // $addToSet
    Article.findOneAndUpdate({'publishTime':body.mode},{$addToSet:{'comments':body.comments}}).then((resolve,reject)=>{
      if (reject) {
        console.log('文章留言被拒绝');
        return res.status(500).json({
          err_code: 500,
          message: 'Server error'
        })       
      }
      else {//save新留言成功
        console.log('留言成功')
        console.log(resolve.comments);
        res.status(200).json({
          
          err_code: 0,//没有问题
          message:'文章留言成功',
          articles:`已收到留言`
        })  
        // console.log(resolve)    
      }    
    
    })
  }
  // console.log('/publishcomment');
  //回贴模式 回主题帖或者回复回复
  else {
    console.log('现在是回复模式');
    const anchor = (body.mode==publishmode)?body.comments.topto:body.mode//如果是留言模式 就按topto找最上层。如果是文章模式  通过publishTime先找文章
    console.log(anchor,'这是anchor');
    const database = MODE[publishmode].database
    console.log(MODE[publishmode].database);
    database.find({$or:[{'publishtime':anchor},{'publishTime':anchor}]}).then((resolve,reject)=>{//获取旧的resolve，在下一轮更新中用函数算出的结果更新他
      if(reject){
       return res.status(500).json({
       err_code: 500,
       message: 'Server error'
      })         
      }
      else if (resolve)
////     Comments.findOneAndUpdate(//更新之
  //       {'publishtime':body.topto},
  //       replyCommentTopic(resolve,body)).then((resolve1,reject1)=>{

      // console.log(resolve,'这篇文章的resolve');
      resolve=(body.mode==publishmode)?resolve:(resolve[0].comments) //如果mode==publishmode，则说明是直接留言‘comment’，如果t不相等，则为文章的留言，取resolve.comments更新
      // console.log(resolve,'这篇文章的处理后的resolve');
      // console.log(resolve);
      database.findOneAndUpdate(//更新之
        {$or:[{'publishtime':anchor},{'publishTime':anchor}]},//通过锚点找到对应的主题贴（通过topto）或者文章（通过publishtime）
        (body.mode==publishmode)?replyCommentTopic(resolve,body.comments):{'comments':replyCommentTopic(resolve,body.comments)}).then((resolve1,reject1)=>{       
          if(reject1)
        return res.status(500).json({
          err_code: 500,
          message: 'Server error'
         }) 
         else if (resolve1)
        res.status(200).json({
          err_code: 0,
          message: 'replyOK',//reply成功
          
        })           
         
      })
    })
  }
  }