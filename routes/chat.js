const controller = require('../controller/chat')

module.exports =  function(router){
  router.get('/', controller.login)
  
  router.post('/chat/login',controller.chatLogin)

  router.get('/chat',controller.chat)

  router.post('/chatContent',controller.chatContent)

  router.get('/getContent',controller.refreshContent)


}
