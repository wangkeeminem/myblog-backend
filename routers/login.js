
const BlogUser = require('../models/user')
const md5 = require('md5-nodejs')
const Permission = require('../models/Permission')

const deviceDetect = require('../utils/userInfoGetFunction')


module.exports = function login(req,res){
  console.log('请求登陆了');
  console.log('该设备是：',deviceDetect(req.headers['user-agent']));
  const body = req.body
  console.log(req.body);
  console.log('有人请求登录');
  BlogUser.findOneAndUpdate({
    username: body.username,
    password:md5(md5(body.password))//前端两侧 这里又来两层加密
    
  },
  {$set: {lastlogintime:body.lastlogintime,status:body.username=='wangke'?0:1}}//如果这是博主wangke0 否则为1
  ).then((resolve,reject) => {
    if (reject) {
      return res.status(500).json({
        err_code: 500,
        message: 'Server error'
      })

    }

    else if (resolve) {
      res.status(200).json({
        err_code: 0,
        message: 'OK',//登陆成功
        title:Permission.column[resolve.status],//给响应菜单权限
        router:Permission.router[resolve.status],//给响应菜单权限
        // articles:resolve1
      })

 
    }//对应//登录成功（进入首页后、发表文章后） 这里作为提供文章的入口前的{

    else {
      return res.status(200).json({
        err_code: 1,
        message: 'email or password is invalid'
      })
    }
  })
}