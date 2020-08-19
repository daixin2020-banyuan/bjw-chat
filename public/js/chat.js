
let inputEle = document.getElementsByClassName('chat-input')[0];


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
                    console.log(result)
                },
                error:()=>{

                }
            })

        }
    }

    


}