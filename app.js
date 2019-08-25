const express = require('express');
const bodyParser = require('body-parser');
const Recipe = require('./models/Recipe');
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://safi:SIhXykf3QSQP0BvT@cluster0-mgq8i.mongodb.net/test?retryWrites=true&w=majority')
        .then(() => {
            console.log('Successfully connected to the MongoDB Atlas!');
        })
        .catch((error) => {
            console.log('Unable to connect.');
        });

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());



app.post('/api/recipes', (req,res,next) => {
    const recipe = new Recipe({
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        difficulty: req.body.difficulty,
        time: req.body.time
    });
    recipe.save().then(() => {
        res.status(201).json({
            message: 'Recipe created successfully!'
        });
    }).catch((error) => {
        res.status(400).json({
            error: error
        });
    });
});
app.get('/api/recipes', (req,res,next) => {
    Recipe.find().then((recipes) => {
        res.status(200).json(recipes);
    }).catch((error) => {
        res.status(400).json((error) => {
            error: error
        });
    });
});
app.get('/api/recipes/:id', (req,res,next) => {
    Recipe.findOne({ _id: req.params.id}).then((recipe) => {
        res.status(200).json(recipe);
    }).catch((error) => {
        res.status(404).json({
            error: error
        });
    });
});
app.put('/api/recipes/:id', (req,res,next) => {
    const recipe = new Recipe({
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        difficulty: req.body.difficulty,
        time: req.body.time,
        _id: req.params.id
    });
    Recipe.updateOne({ _id: req.params.id }, recipe).then(() => {
        res.status(201).json({
            message: 'Updated!'
        });
    }).catch((error) => {
        res.status(400).json({
            error: error
        });
    });
});
app.delete('/api/recipes/:id', (req,res,next) => {
    Recipe.deleteOne({_id: req.params.id}).then(() => {
        res.status(200).json({ message: 'Deleted!'});
    }).catch((error) => {
        res.status(400).json({ error: error});
    });
});

module.exports = app;