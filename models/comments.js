// export default interface comments{
//   replyto?:number;//定义为原帖主的publishtime，用来服务端寻找原帖主的publishtime并进行连接thread
//   publishtime:number;
//   userid:string;
//   details:{day:number,month:string,year:number},
//   content:string;
//   thread:comments[]| [];
//   layer:number
// }

const mongoose= require('mongoose')

mongoose.connect('mongodb://localhost/bloguser',{ useNewUrlParser: true,useUnifiedTopology: true ,useCreateIndex: true })//库名bloguser
mongoose.set('useFindAndModify', true);//使用update功能
const userSchema = new mongoose.Schema({
  topto:{
    type:Number,
    required:false
  },
  replyto:{
    type: Number,
    required: false
  },
  publishtime:{
    type:Number,
    required:true,
  },
  userid:{
    type:String,
    required:true
  },
  details:{//主要是时间 与publishtime一致
    type:Object,
    required:true
  },
  content:{
    type:String,
    required:true 
  },
  thread:{//回帖
    type:Array,
    required:false
  },
  layer:{//当前回帖的层级数
    type:Number,
    required:true
  },
  updateTime:{//更新时间 用于主题贴更新时进行赋值
    type:Number,
    required:false,
    default:Date.now()
  }
})

userSchema.index({publishTime:-1})//以publishTime进行倒序排列 最晚发的在上面
module.exports = mongoose.model('Comments',userSchema)