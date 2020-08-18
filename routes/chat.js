const controller = require('../controller/chat')

module.exports =  function(router){
  router.get('/', controller.login)
  
  router.post('/chat/login',controller.chatLogin)

  router.get('/chat',controller.chat)


}
