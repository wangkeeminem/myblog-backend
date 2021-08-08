const mongoose= require('mongoose')

mongoose.connect('mongodb://localhost/bloguser',{ useNewUrlParser: true,useUnifiedTopology: true  })
mongoose.set('useFindAndModify', true);//使用update功能
const userSchema = new mongoose.Schema({
  username:{
    type: String,
    required: true
  },
  password:{
    type:String,
    required:true
  },
  lastlogintime:{//上次登录时间
    type:Number,
    default:Date.now()
  },//相当与定义了一个方法
  registertime:{//注册时间
    type:Number,
    default:Date.now()
  },
  status:{//账户状态
    type: Number,
    enum:[0,1,2],
    //0 没有权限限制
    //1 不可以进行博客创作，可以进行回复
    //2 不可以登录
    default:1
  }
})

module.exports = mongoose.model('BlogUser',userSchema)