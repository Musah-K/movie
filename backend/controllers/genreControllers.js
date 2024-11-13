import asyncHandler from "./asyncHandler.js";
import GenreModel from '../models/genre.js';

const createGenre = asyncHandler(async(req,res)=>{
    const {name} = req.body;
    if(!name)res.status(411).send('Name is required');
    const genreExists = await GenreModel.findOne({name});
    if(genreExists)res.send('Already has this genre');
    const newGenre = new GenreModel({name});
    await newGenre.save();
    res.status(201).json(newGenre)

});

const updateGenre = asyncHandler(async(req,res)=>{
        const {name} = req.body;
        const {id} = req.params;
        console.log(id)
        const genre = await GenreModel.findOne({_id: id});

        if(!genre){
            return res.status(404).send("genre not found")};

        genre.name = name;
        await genre.save();
        res.status(202).json({genre});

});

const deleteGenre = asyncHandler(async(req,res)=>{
    
        const {id} = req.params;
        const remove = await GenreModel.findByIdAndDelete(id);
        if(!remove) return res.status(404).send("Genre not found");
        res.json({remove});

});

const allGenres = asyncHandler(async(req,res)=>{

    const genres = await GenreModel.find({});
    res.json(genres);
});
const readGenre = asyncHandler(async(req,res)=>{
        const {id} = req.params;
    const genre = await GenreModel.findById(id);
    res.json(genre)

    
});

export  {createGenre,updateGenre, deleteGenre, allGenres, readGenre};