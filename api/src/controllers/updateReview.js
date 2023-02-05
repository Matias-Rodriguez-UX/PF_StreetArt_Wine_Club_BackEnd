const { Review, User } = require("../db");

const updateReview = async function(idReview, review, rating){

    const update = Review.update(
		{ review: review, 
          rating: rating },
		{ where: { id: idReview} },
	)

    if (update){
        return 'Your review was successfully updated'
    }
}

module.exports = {updateReview}