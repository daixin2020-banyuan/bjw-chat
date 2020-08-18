let inputEle = document.getElementsByClassName('login-input')[0];
let btnEle = document.getElementsByClassName('login-button')[0];

btnEle.onclick = function(){
    let nickname = inputEle.value;

    if(nickname){
        $.ajax({
            type:'post',
            url:'http://localhost:4000/chat/login',
            data:{
                nickname
            },
            success:(result)=>{

                if(result.status === 'success'){
                    location.href='/chat'
                }

            },
            error:()=>{

            }
        })
    }
}