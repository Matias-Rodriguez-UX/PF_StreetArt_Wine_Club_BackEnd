const { Newsletter } = require("../db");
const {emailNewsletter} = require ('../controllers/email');


const createNewsletter = async function (email) {

    if (!email) {
      throw new Error('You must complete email')
    }
    const findEmail = await Newsletter.findOne({
      where: {
        email: email,
      },
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
      return `${email} was added succesfully to newsletter  `
    } else {
  
      return `${email} email already exists`
    }
  }
  module.exports = { createNewsletter };