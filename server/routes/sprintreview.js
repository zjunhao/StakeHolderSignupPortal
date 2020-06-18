const express = require('express');
const route = express.Router();

const SprintReviewItem = require('../models/sprint_review_item');

// get a list of all sprint reviews
route.get('/getItemList', (req, res) => {
    SprintReviewItem.find(function(err, itemList){
        res.json(itemList);
    });
});

// create a new sprint review
route.post('/addItem', (req, res)=>{
    let newItem = new SprintReviewItem({
        title: req.body.title,
        total_slots: req.body.total_slots,
        event_organizer: req.body.organizer,
        event_time: req.body.time
    });

    newItem.save((err, item)=>{
        if(err){
            res.json({msg: 'Failed to create sprint review'});
        } else {
            res.json({msg: 'Sprint review created successfully'});
        }
    });
});

// delete a sprint review
route.delete('/deleteItem/:id', (req,res)=>{
    SprintReviewItem.remove({_id: req.params.id}, function(err, result){
        if (err) { 
            res.json(err);
        } else {
            res.json(result);
        }
    })
});

module.exports = route;