var express = require("express");
var router = express.Router();

let Movies = require('../model/movies');


/* GET movies listing. */
router.get("/", async (req, res) => {
    try {
        const movies = await Movies.find();
        if (!movies) throw Error('No Items');
        await res.status(200).json(movies);
    } catch (err) {
        await res.status(404).json({message: err});
    }
});

router.get("/:id", async (req, res) => {
    try {
        const movie = await Movies.findById(req.params.id);
        if (!movie) throw Error('No Items');
        await res.status(200).json(movie);
    } catch (err) {
        await res.status(404).json({message: err});
    }
});

router.post("/", async (req, res) => {
    const newMovie = new Movies(req.body);
    try {
        const saveMovie = await newMovie.save();
        if (!saveMovie) throw Error('No Items');
        await res.status(200).json(saveMovie);
    } catch (err) {
        await res.status(400).json({message: err});
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const movie = await Movies.findByIdAndUpdate(req.params.id, req.body);
        if (!movie) throw Error('Something went wrong while updating the movie');
        await res.status(200).json({success: true, movie: movie});
    } catch (err) {
        await res.status(404).json({message: err});
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const movie = await Movies.findByIdAndDelete(req.params.id);
        if (!movie) throw Error('No Movie Found');
        await res.status(200).json({success: true});
    } catch (err) {
        await res.status(404).json({message: "Movie not found"});
    }
});

// router.get(/^matrix.*$/, function (req, res, next) {
//     console.log("Matrix / Controller");
//     res.send("Matrix Movie List");
// });

router.post("/", function (req, res, next) {
    console.log("Movies / Controller");
    res.send("Movie Created");
});

router.get("/details", function (req, res, next) {
    console.log("Movies Details / Controller");
    res.send("Movie Detail");
});

module.exports = router;
