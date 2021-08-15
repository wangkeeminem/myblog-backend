const fs = require('fs')
//删除图片函数
module.exports =
function deleteImage(res,imagePathList){
  console.log('将要删除的image为',imagePathList);
  for(let imagePath of imagePathList){
    fs.unlinkSync(imagePath,err=>{
      if (err) console.log('删除报错了');
      return res.status(500).json({
        err_code: 500,
        message: 'Server error'
      }) 
    })
  }
}