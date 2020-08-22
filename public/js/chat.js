// const moment = require('moment')
// const _ = require('lodash');
let inputEle = document.getElementsByClassName('chat-input')[0];
let contentEle = document.getElementsByClassName('chat-detail-right')[0];
let ele = document.getElementsByClassName('chat-content')[0];
let warningEle = document.getElementsByClassName('warning')[0];
let timer;
let originData;
stopTimer();
longPolling();
scrollToBottom();
getOriginData();


inputEle.onkeydown = function(e){
    var key = e.which

    if(key == 13 ){
        let value = inputEle.value
        if(value){
            $.ajax({
                type:'post',
                url:'http://localhost:4000/chatContent',
                data:{
                    content:value
                },
                success:(result)=>{
                    if(result.status === 'success'){
                        render(result.contents);
                        inputEle.value='';
                        scrollToBottom()
                        originData = result.contents
                        console.log('originData 回车时===>',originData)
                    }
                }
            })
        }
    }

}

// console.log('originData++===>',originData)
console.log(1)

//置底部
    function scrollToBottom(){
        ele.scrollTop=ele.scrollHeight
    }

    
    function getOriginData(){

        $.ajax({
          type:'get',
          url:'http://localhost:4000/getContent',
          data:{},
          success:(result)=>{
            originData = result.contents

            console.log(originData);
          }
        })
        
    }


    //长轮询
    function longPolling(){
        timer= setInterval(() => {
            $.ajax({
                type:'get',
                url:'http://localhost:4000/getContent',
                data:{},
                success:(result)=>{
                    render(result.contents)
                    // console.log('originData 轮询时===>',originData)

                    if(originData){
                        result.contents.filter((item)=>{
                            let flag  = moment(originData[originData.length-1].createdAt).isBefore(moment(item.createdAt))
                            if(flag){
                                warningEle.style.display='block'
                            }
                        })
                    }
                }
            })          
        }, 2000);
    }

    //关闭消息提示窗口
    warningEle.onclick = function(){
        scrollToBottom()
        warningEle.style.display='none'

        getOriginData()
    }


    //停止定时器
    function stopTimer(){
        if(timer){
            clearInterval(timer)
        }
    }


    //渲染聊天部分内容
    function render(contents){
        let html = '';
        contents.forEach((item)=>{
        html += `<div class='chat-content-container'>`+
                `<div class='chat-detail clearFix'>`+
                `<div class='chat-detail-left'>`+
                `<img src='${item.avatar}' class='chat-avatar'/>`+
                `<div class='chat-name'>${item.nickName}</div>`+
                `</div>`+
                `<div class='chat-detail-right'>${item.content}</div>`+
                `</div>`+
                `<div class='chat-time'>${moment(item.createdAt).locale('zh_cn').format('YYYYMMMMDo  aHH:MM:SS')}</div>`+   
                `</div>`
        })

        $('.chat-content').html('');
        $('.chat-content').html(html);
    }

