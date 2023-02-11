const { Membership, User } = require("../db");

const newMembership = async function( id , name, discount, price ){
    
    // if(!name || !discount || !price){
    //     throw new Error('The fields are required')
    // }
    
    const searchMembership = await Membership.findOrCreate({
        where: {
            name : name,
            discount : discount,
            price: price
         
        },
    })
    
    console.log('MEMBRESIA BUSCADA', searchMembership )

    
    const searchUser =  await User.findAll({
        where: {
            id: id,
        },
    })
    console.log(' el USUARIO', searchUser)

    if(searchUser){
        await searchMembership.setUser(searchMembership)
        return "Se agrego el ID"
    }

    }
    
    
    
    module.exports = {newMembership}