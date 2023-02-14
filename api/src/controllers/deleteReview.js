const { Review, User } = require("../db");

const deleteReview = async function(idReview
){

const delReview = Review.destroy({
    where: {
    
        id: idReview
    }
})

if(delReview){
    return 'The review was successfully removed'
}

}

module.exports = {deleteReview}