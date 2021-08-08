const { exec } = require('child_process')
const md5 = require('md5-nodejs')
const fs =require('fs')

const Videos = require('../models/videos')

const BASE_URL = require('../routers/config')

function updateVideo(){
  const fileBuffer=fs.readdirSync('public/video','utf-8')
  console.log('当前的文件状态为',md5(fileBuffer));
  const filesListBefore=fs.readFileSync('public/video/files.txt','utf-8')
  const isFileChange = ArrayMatch(filesListBefore.split("*&*"),fileBuffer)
  if(!isFileChange)//没变
   {console.log('不用更新了');return {}}
  // fs.readFileSync('public/video/files.txt','utf-8').split("*&*")
  else{//文件有变化
  console.log('需要更新'); 
  isFileChange.forEach(el=> {
    if(!(el=='files.txt'||el=='git.txt'||el=='screenshot'))
    {
      const command = `ffmpeg -ss 00:00:10 -i public\\video\\${el} public\\video\\screenshot\\${el}.jpg`
      exec(command,(error, stdout, stderr)=>{    
      fs.writeFileSync('public/video/git.txt',md5(fileBuffer)) //写入状态文件
      fs.writeFileSync('public/video/files.txt',fileBuffer.join("*&*")) //写入文件名记录文件
      const gitState=fs.readFileSync('public/video/git.txt','utf-8')//写入当前文件夹的状态码
      console.log('写入后文件内容是:',gitState); 
      console.log('已更新:',el);
      // Videos
      const videoId = md5(el)
      const videoPath = BASE_URL + `/public/video/${el}`
      const titleImagePath = BASE_URL + `/public/video/screenshot/${el}.jpg`
      const videoTitle = el.slice(0,el.lastIndexOf('.'))//截取取得文件名
      const video = {videoId,videoPath,titleImagePath,videoTitle}
      const newuser=new Videos(video)//新建一个video对象
      newuser.save()//保存
      })
    }
    else{console.log(el,'不需要更新');}
    });
  }
}

function ArrayMatch(arr1,arr2){//arr1为原有的，arr2为现有的 arr2中可能会存在独有的东西
  console.log({arr1});
  console.log({arr2});
  
  const arr2_arr1=arr2.filter(item=>{
    // console.log('匹配状况：',arr1.includes(item));
    if(!arr1.includes(item))
    return item
  })//arr1独有的

  return arr2_arr1.length?arr2_arr1:false
}

updateVideo()