module.exports =  (router) => {
  router.get('/chat', async function (ctx, next) {
    ctx.state = {title:'koa2 title'}
    await ctx.render('index')

  }
  
)
}
