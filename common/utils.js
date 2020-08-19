const _ = require('lodash')
const { random } = require('lodash')
const moment =require('moment')

function getRandomAvatar(){
    const avatars = [
        'https://wx1.sbimg.cn/2020/08/19/3vRaU.png',
        'https://wx1.sbimg.cn/2020/08/19/3vBhm.jpg',
        'https://wx1.sbimg.cn/2020/08/19/3vApJ.jpg',
        'https://wx2.sbimg.cn/2020/08/19/3vG88.jpg',
        'https://wx2.sbimg.cn/2020/08/19/3v912.jpg',
        'https://wx2.sbimg.cn/2020/08/19/3v6P1.jpg'
      ]

      let index = _.random(0,5)

      return avatars[index]
}

function formatTime(time){

    return moment(time).locale('zh_cn').format('YYYYMMMMDo  aHH:MM:SS')
  }
  
module.exports={
    getRandomAvatar,
    formatTime
}