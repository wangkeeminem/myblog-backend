
const BlogUser = require('../models/user')
const md5 = require('md5-nodejs')
const Permission = require('../models/Permission')


module.exports=function register(req,res){
    
  const body = req.body
  console.log(req.body);
  body.password = md5(md5(body.password))
  BlogUser.findOne({username:body.username}).then((resolve,reject)=>{
    if(reject){//连接错误
      return res.status(500).json({
        err_code:500,
        message:'Server error'
      })       
    }
    if(resolve){//如果找到了
      return res.status(200).json({
        err_code:1,//用户名已存在
        message:'用户名已存在'
      })
   }
   const newuser=new BlogUser(body)//注意这里的body设计
   newuser.save().then((resolve,reject) => {
     if (reject) {
       console.log('hahahhaha');
       return res.status(500).json({
         err_code: 500,
         message: 'Server error'
       }) 
     }
       else {
         // req.session.user = resolve//当登陆成功，将session的isLogin状态改为true
         res.status(200).json({
           err_code: 0,//没有问题
           message:'Register Sucessed',
           title:Permission.column[resolve.status],
           router:Permission.router[resolve.status]
         })
         
       }
     })  

  })
}