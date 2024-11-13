import {Router} from 'express';
import checkId from '../middlewares/checkId.js';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';

import { createMovie, deleteComment, deleteMovie, getAllMovies, getNewMovies, getRandomMovies, getTopMovies, movieReview, specificMovie, updateMovie } from '../controllers/movieControllers.js';

const router = Router();

 router.post('/createMovie', authenticate, authorizeAdmin, createMovie);
 router.post("/:id/reviews",authenticate, checkId, movieReview);

router.get('/all-movies', getAllMovies);
router.get('/specificMovie/:id', specificMovie);
router.get('/new-movies', getNewMovies);
router.get('/top-movies',getTopMovies);
router.get('/random-movies', getRandomMovies);


router.put('/updateMovie/:id',authenticate, authorizeAdmin, updateMovie);

router.delete("/delete-movie/:id",authenticate,authorizeAdmin, deleteMovie);
router.delete("/delete-comment", authenticate, authorizeAdmin, deleteComment)

export default router;