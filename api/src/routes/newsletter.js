const { Router } = require('express');
const {emailNewsletter} = require ('../controllers/email')


const router = Router();

router.post('/', async (req, res) => {
    
    const { email } = req.body
    //console.log(req.body)
   
    try {
        emailNewsletter(email)
        res.status(200).send(email)
        console.log('email ok')
    } catch (error) {
        res.status(400).send(error.message)
    }
})



module.exports = router;