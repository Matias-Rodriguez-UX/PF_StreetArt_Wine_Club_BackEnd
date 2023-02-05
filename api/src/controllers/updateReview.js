const { Review, User } = require("../db");

const updateReview = async function(id, idReview, review, rating){

    const update = Review.update(
		{ review: review, 
          rating: rating },
		{ where: { productId: id, id: idReview} },
	)

    if (update){
        return 'Your review was successfully updated'
    }
}

module.exports = {updateReview}