const mongoose= require('mongoose')

mongoose.connect('mongodb://localhost/bloguser',{ useNewUrlParser: true,useUnifiedTopology: true })//库名
mongoose.set('useFindAndModify', true);//使用update功能
mongoose.set('useCreateIndex', true);//使用update功能
const userSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  details:{
    type:Object,
    required:true,
  },
  content:{//上次登录时间
    type:String,
    required:true 
  },//相当与定义了一个方法
  tagChoice:{//标签标记
    type:Array,
    required:true
  },
  publishTime:{
    type:Number,
    default:Date.now()
  },
  comments:{
    type:Array,
    default:[]
  },
  imagePathList:{
    type:Array,
    default:[]
  },
  editArticleId:{
    type:String,
    required:false
  },

})

userSchema.index({publishTime:-1})
module.exports = mongoose.model('Article',userSchema)