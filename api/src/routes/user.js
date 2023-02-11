router.get('/', async (req, res) => {
    try {
        const { id } = req.params;
        let result = await getReviews(id)
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post('/', async (req, res) => {
    try {
        const { id } = req.params;
        const { review, rating } = req.body;

        let result = await newReview(id, review, rating)
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.delete('/', async (req, res) => {
    try {
        const { idReview } = req.params

        let result = await deleteReview(idReview)
        res.status(200).send(result)

    } catch (error) {
        res.status(400).send(error.message)

    }
})

router.put('/', async (req, res) => {
    try {
        const { id, idReview } = req.params
        const { review, rating } = req.body;

        let result = await updateReview(idReview, review, rating)
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error.message)
    }
})