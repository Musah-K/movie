import MovieModel from "../models/movies.js";
import asyncHandler from "./asyncHandler.js";

const getAllMovies = asyncHandler(async(req,res)=>{
    try {
        const movies = await MovieModel.find({})
        res.send(movies);

    } catch (error) {
        res.status(404).send('An error occured')
    }
});

const createMovie = asyncHandler(async(req, res)=>{
    try {
        const newMovie = new MovieModel(req.body);
        const savedMovie =await newMovie.save();
        res.json(savedMovie);

    } catch (error) {
        res.status(500).json({error: error.message})
    }
});

const specificMovie = async(req, res) =>{

    try {
        const {id} =req.params;
        const movie =await MovieModel.findById(id);
        if(!movie){
           return res.status(404).json({message: "Movie not found"})
}
        res.json(movie);
    } catch (error) {
        res.status(500).json({error: error.message})  
    }

};

 const updateMovie = async(req, res) => {
    
    try {
        const {id} = req.params;
        const movie =await MovieModel.findByIdAndUpdate(id, req.body, {new: true});
        if(!movie){
            return res.status(404).json({message: "Movie not found"})}
            res.json(movie)
        
    } catch (error) {
        res.status(500).json({error: error.message})  
    }
 };

const movieReview = async(req,res)=>{
    try {
        const {rating, comment} = req.body;
        const movie =await MovieModel.findById(req.params.id);
        if(movie){
            const alreadyReviewed = movie.reviews.find(r=> r.user.toString() === req.user._id.toString());

            if(alreadyReviewed){
                res.status(400)
                throw new Error("movie already reviewed")
            }

            const review = {
                name: req.user.username,
                rating: Number(rating),
                comment,
                user: req.user._id
            }

            movie.reviews.push(review);
            movie.numReviews =movie.reviews.length;
            movie.rating = movie.reviews.reduce((acc,item)=> acc + item.rating, 0)/ movie.reviews.length;

            await movie.save();
            res.status(201).json({message: "review Added"})

        }else{
            res.status(404)
            throw new Error('Movie not found');
        }

    } catch (error) {
        console.error(error)
        res.status(400).json(error.message)
    }
};

const deleteMovie = async(req, res)=>{
    try {
        const {id} = req.params;
        const movie =await MovieModel.findByIdAndDelete(id);
        if(!movie){
            res.status(404)
            throw new Error("Movie not found");
        }

        res.json({message: "Movie deleted successifully"})

    } catch (error) {
        res.status(500).json({error: error.message})
    }
};

const deleteComment = async(req, res) =>{

    try {
        const {movieId, reviewId} = req.body;
        const movie = await MovieModel.findById(movieId);
        const reviewIndex = movie.reviews.findIndex(x=> x._id.toString() === reviewId);

        if(reviewIndex === -1){
            return res.status(404).json({message: "Comment not found"});
        }

        movie.reviews.splice(reviewIndex, 1)
        movie.numReviews = movie.reviews.length;
        movie.rating = movie.reviews.length > 0 ? movie.reviews.reduce((acc, item)=> acc + item.rating, 0) / movie.reviews.length: 0;

        await movie.save();
        res.json({message: "Comment deleted successifully"})

    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message})
    }
};

const getNewMovies = async(req, res) =>{
    try {
        const movies = await MovieModel.find().sort({createdAt: -1}).limit(10);
        res.json(movies);
    } catch (error) {
        res.status(500).json({error: error.message})
    }

};

const getTopMovies = async(req, res) =>{
    try {
        const movies = await MovieModel.find().sort({numReviews: -1}).limit(10);
        res.json(movies);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
};

const getRandomMovies = async(req, res)=>{
    try {
        const randomMovies = await MovieModel.aggregate([{$sample:{size: 10}}]);
        res.json(randomMovies)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
};



export {getAllMovies, createMovie, specificMovie, updateMovie,movieReview, deleteMovie, deleteComment, getNewMovies, getTopMovies, getRandomMovies}

