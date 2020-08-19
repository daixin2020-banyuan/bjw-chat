const services = require('../services/chat')
const {getRandomAvatar} =require('../common/utils')

async function login(ctx, next) {

    await ctx.render('login')
}


async function chatLogin(ctx,next){
    const { nickname } = ctx.request.body
    
    const avatar = getRandomAvatar()

    ctx.cookies.set('user',JSON.stringify({nickname,avatar}),
        {maxAge:24*60*60*1000}
    );
    if(nickname){
        ctx.response.body ={status: 'success'}        
    }

}

async function chat(ctx,next){

   let user = ctx.cookies.get('user')

   if(user){
       user = JSON.parse(user)
       if(user.nickname){
        const contents =await services.getContent()

        ctx.state={
            nickName:user.nickname,
            contents,
        }

        await ctx.render('chat',ctx.state)
       }else{
        ctx.redirect('/')
       }
   }else{
       ctx.redirect('/')
   }
    
}

async function chatContent(ctx,next){
    const { content } = ctx.request.body

    let user = ctx.cookies.get('user')

    
    let data = {
        status:'failed'
    }

    if(user){
        const{ nickName ,avatar} = JSON.parse(user)

        await services.addContent({nickName,avatar,content})

        data.status = 'success'
    }


    ctx.response.body = data

}




module.exports={
    login,
    chatLogin,
    chat,
    chatContent,
}