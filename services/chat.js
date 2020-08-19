const {insertOne , find} = require ('../models/chat')
const moment = require('moment')


// 添加内容到后台
async function addContent(data){

    await insertOne(data)

}

    /* 
 * 获取聊天信息
*/
async function getContent(){

    // 查找从现在开始，1天内的数据
    return await find({
      createdAt:{
        $gt:moment().subtract(1,'day').toDate(),
        $lt:moment().toDate(),
      }
    })
}
                                                                                  

module.exports={
    addContent,
    getContent
}