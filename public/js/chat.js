
let inputEle = document.getElementsByClassName('chat-input')[0];
let contentEle = document.getElementsByClassName('chat-detail-right')[0];

let timer;

stopTimer();

longPolling();

scrollToBottom();

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
                    }
                },
                error:()=>{
                }
            })
        }
    }
}

    function scrollToBottom(){
        let ele = document.getElementsByClassName('chat-content')[0];
        ele.scrollTop=ele.scrollHeight

    }

    function longPolling(){
        timer= setInterval(() => {
            $.ajax({
                type:'get',
                url:'http://localhost:4000/getContent',
                data:{},
                success:(result)=>{
                    render(result.contents)
                }
            })          
        }, 2000);
    }
    
    function stopTimer(){
        if(timer){
            clearInterval(timer)
        }
    }

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
                $('.chat-content').html(html)
    }

