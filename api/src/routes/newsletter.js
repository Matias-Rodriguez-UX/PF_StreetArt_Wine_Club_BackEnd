const { Router } = require('express');
const { createNewsletter } = require('../controllers/postNewsletter');
const { Newsletter } = require("../db");
const router = Router();

router.post('/', async (req, res) => {
    
    const { email } = req.body
    //console.log(req.body)
   
    try {
        await createNewsletter(email)
        res.status(200).send(email)
        console.log('email ok')
    } catch (error) {
        res.status(400).send(error.message)
    }
})


router.put('/', async (req, res) => {
    try {
      const  { email } = req.body;
  
      const updateStatus = await Newsletter.update({
        email: email,
        userStatus: 'unsubscribed',

      },{
        where:{
           email: email,
           userStatus:'subscribed',
        
                  
        }
      });

      res.status(200).send(updateStatus)
    } catch (error) {
      res.status(400).send(console.log(error.message))
    }
  })


  router.get('/', async (req, res) => {
    try {
        let result = await Newsletter.findAll();
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error.message)
    }
})






module.exports = router;