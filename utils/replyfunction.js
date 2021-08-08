// import { Ref } from '@vue/runtime-dom';
// import comments from '../types/commentslist'
//参数：1.原帖内容全部list内容  2.新的回复信息（layer topto reply均已传递过来） 这应该很简单了
//要求 ：返回更新所在的主题贴（不是全部）  这里还是利用循环将整个list进行更新，再遍历数据库的时候通过新list的topto找到主题贴和旧的进行update更新即可
module.exports = function replyComments(commentsList,newcomments){
  commentsList.forEach((item,index)=>{//这是主贴的回复
  if(item.publishtime==newcomments.replyto)//遍历 如果匹配的上
  {
    console.log('回复主贴');

   ;(commentsList[index].thread).unshift(newcomments)
   
  }//讲跟帖内容信息附上 并添加主贴id至replyto
  else{
    if (commentsList[index].thread) {
      replyComments(commentsList[index].thread,newcomments)//如果当前贴没有 到他的回帖中查找并匹配
    }                    
  } 
  })  
  //上面是构建整个数据库的算法
  //下面是找到这一列的算法
  let updateTopic = []
  commentsList.forEach((item)=>{
    if (item.publishtime ==newcomments.topto){
      updateTopic = item//将该主题贴赋值给updateTopic
    }
  })
  return updateTopic      
}  
// const Comments = require('./models/comments')
