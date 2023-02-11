const { Membership, User } = require("../db");

const newMembership = async function(id, name, discount, price ){
    
    if(!name || !discount || !price){
        throw new Error('The fields are required')
    }
    
        const addMembership = await Membership.create({
            id: id,
            name: name,
            discount: discount,
            price: price
           
            
        })
    
    
        if(addMembership){
            return 'The membership was created successfully'
        }
    
    }
    
    module.exports = {newMembership}