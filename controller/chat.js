const services = require('../services/chat')
const { getRandomAvatar } =require('../common/utils') 

async function login(ctx, next) {

    await ctx.render('login')
}


async function chatLogin(ctx,next){
    const { nickName } = ctx.request.body
    const avatar = getRandomAvatar()

    ctx.cookies.set('user',JSON.stringify({nickName,avatar}),
        {maxAge:24*60*60*1000}
    );
    if(nickName){
        ctx.response.body ={status: 'success'}        
    }

}

async function chat(ctx,next){

   let user = ctx.cookies.get('user')

   if(user){
       user = JSON.parse(user)
       if(user.nickName){
        const contents =await services.getContent()

        ctx.state={
            nickName:user.nickName,
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
        const contents =await services.getContent()
        data={
            contents,
            status : 'success'
        }
    }
    ctx.response.body = data

}

async function refreshContent(ctx,next){

    const contents =await services.getContent()
    ctx.response.body = {
        status:'success',
        contents
    }

}




module.exports={
    login,
    chatLogin,
    chat,
    chatContent,
    refreshContent
}