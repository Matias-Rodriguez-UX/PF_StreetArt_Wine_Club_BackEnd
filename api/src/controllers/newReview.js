const { Review, User } = require("../db");

const newReview = async function(id, review, rating, email ){
    
if(!review || !rating){
    throw new Error('The fields are required')
}

    const addReview = await Review.create({
        productId: id,
        review: review,
        rating: rating,
        userEmail: email
       
		
    })


    if(addReview){
        return 'The review was created successfully'
    }

}

module.exports = {newReview}