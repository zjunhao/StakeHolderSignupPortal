const express = require('express');
const route = express.Router();

const SprintReviewItem = require('../models/sprint_review_item');

// get a list of all sprint reviews
route.get('/getItemList', (req, res) => {
    // TODO: get list group by group
    SprintReviewItem.find(function(err, itemList){
        let trimItemList = [];
        itemList.forEach(item => {
            let trimItem = {
                _id: item._id,
                title: item.title,
                start_time: item.start_time,
                end_time: item.end_time,
                short_description: item.short_description
            }
            trimItemList.push(trimItem);
        })
        trimItemList.sort((a, b) => (b.start_time.localeCompare(a.start_time)));
        res.json(trimItemList);
    });
});

// get all detail about a specific sprint review
route.get('/getItem/:id', (req, res) => {
    // TODO: for each attendee id, find attendee name and return name instead
    SprintReviewItem.findById(req.params.id, function(err, itemDetail){
        if (err) { 
            console.log('SERVER > get item detail error');
            res.json(err);
        } else {
            console.log('SERVER > get item detail succeed');
            res.json(itemDetail);
        }
    })
});

// create a new sprint review
route.post('/addItem', (req, res)=>{
    let newItem = new SprintReviewItem({
        title: req.body.title,
        total_slots: req.body.totalSlots,
        event_organizer: req.body.organizer,
        short_description: req.body.description,
        start_time: req.body.startTime,
        end_time: req.body.endTime
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