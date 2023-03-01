const { Newsletter, User } = require("../db");
const { emailNewsletter } = require ('../controllers/email');


const createNewsletter = async function (email) {

    if (!email) {
      throw new Error('You must complete email')
    }

    const users = await User.findOne({
      where: {
        email: email,
      },
    });

    //console.log('soy el user',users)
    if(users){
      const news = await Newsletter.findOne({
        where: {
          email: email,
        },
      });

      if(!news){      
        
        const newMailNewsletter = await Newsletter.create({
        email: email,
        userStatus:'subscribed',
        status: 'sent',
     
      })
    
    
      await newMailNewsletter.setUser(users)
      
      await emailNewsletter(email)
    
    } else {
      const updateStatus = await Newsletter.update({
        email: email,
        userStatus:'subscribed',
        status: 'sent'
     
      },{
        where:{
           email: email,
           userStatus: 'unsubscribed',
       
        }
      })
      
      await emailNewsletter(email)
    }

    } else if (!users) {
      const findEmail = await Newsletter.findOne({
        where: {
          email: email,
        },
      });
      
        if (!findEmail) {
          const newMailNewsletter = await Newsletter.create({
            email: email,
         
          });
    
          const updateStatus = await Newsletter.update({
            email: email,
            userStatus:'subscribed',
            status: 'sent'
         
          },{
            where:{
               email: email,
               userStatus: 'unsubscribed',
               status: 'pending'         
            }
          });
    
          await emailNewsletter(email);

    } else {
      const updateStatus = await Newsletter.update({
        email: email,
        userStatus:'subscribed',
        status: 'sent'
     
      },{
        where:{
           email: email,
           userStatus: 'unsubscribed',
       
        }
      });

      await emailNewsletter(email);
    }

        return `${email} was added succesfully to newsletter  `
      
      }
    


  }
  module.exports = { createNewsletter };