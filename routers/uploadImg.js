const fs = require('fs')
const multiparty = require('multiparty')
const BASE_URL = require('./config')
module.exports = 
function uploadImg(req,res){
  console.log('有图片上传请求')
 /* 生成multiparty对象，并配置上传目标路径 */
 let form = new multiparty.Form();
 // 设置编码
 form.encoding = 'utf-8';
 // 设置文件存储路径，以当前编辑的文件为相对路径
 form.uploadDir = './public/article_album';
 // 设置文件大小限制
 // form.maxFilesSize = 1 * 1024 * 1024;
 form.parse(req, function (err, fields, files) {
   try {
     const data =[]
     Object.keys(files).forEach(item=>{
       data.push({url:BASE_URL+files[item][0].path,alt:files[item][0].fieldName})
     })
    //  console.log("files:",files);
    //  let inputFile = files.file[0];
    //  let newPath = form.uploadDir + "/" + inputFile.originalFilename;
     // 同步重命名文件名 fs.renameSync(oldPath, newPath)
　　　 //oldPath  不得作更改，使用默认上传路径就好
    //  fs.renameSync(inputFile.path, newPath);
    //  res.send({ data: "上传成功！" });
    return res.status(200).json({
      "errno": 0,
      "data":data
    })
   } catch (err) {
     console.log(err);
     res.send({ err: "上传失败！" });
   };
 })
}