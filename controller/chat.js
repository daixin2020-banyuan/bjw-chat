

async function login(ctx, next) {

    await ctx.render('login')
}


async function chatLogin(ctx,next){
    const { nickname } = ctx.request.body
    console.log('{ nickname }======>',{ nickname })
    
    ctx.cookies.set('user',JSON.stringify({nickname}));
    if(nickname){
        ctx.response.body ={status: 'success'}        
    }else{
        ctx.redirect('/login')
    }

}

async function chat(ctx,next){

   let user = ctx.cookies.get('user')

   if(user){
       user = JSON.parse(user)
       if(user.nickname){
        await ctx.render('chat')
       }else{
        ctx.redirect('/')
       }
   }else{
       ctx.redirect('/')
   }
    
}

module.exports={
    login,
    chatLogin,
    chat
}