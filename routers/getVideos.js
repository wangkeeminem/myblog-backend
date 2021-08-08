
const Videos = require('../models/videos')


module.exports=function getVideos(req,res){
  console.log('请求视频');

  Videos.find().sort({'publishTime':-1}).then((resolve1,reject1)=>{
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
        videos:resolve1
      })//登陆成功
    }
  })
}