const mongoose= require('mongoose')

mongoose.connect('mongodb://localhost/bloguser',{ useNewUrlParser: true,useUnifiedTopology: true  })
mongoose.set('useFindAndModify', true);//使用update功能
const userSchema = new mongoose.Schema({
  videoId:{//使用nanoid()的方式 简化一下名字
    type: String,
    required: true
  },
  videoPath:{//进行网络访问的url地址
    type:String,
    required:true
  },
  titleImagePath:{//进行网络访问的url地址
    type:String,
    required:true 
  },//相当与定义了一个方法
  videoTitle:{//使用文件名作为title
    type:String,
    required:true 
  },
  publishTime:{//服务器存储时的事件戳
    type: Number,
    required:true,
    default:Date.now()
  }
})

module.exports = mongoose.model('Video',userSchema)
