const express = require('express');
const route = express.Router();

const SprintReviewItem = require('../models/sprint_review_item');

// get a list of all sprint reviews
route.get('/getItemList', (req, res) => {
    // TODO: get list group by group
    SprintReviewItem.find(function(err, itemList){
        var trimItemList = [];
        itemList.forEach(item => {
            var trimItem = {
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
            res.json(err);
        } else {
            res.json(itemDetail);
        }
    })
});

// create a new sprint review
route.post('/addItem', (req, res)=>{
    var newItem = new SprintReviewItem({
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

// update field of a sprint review
route.put('/updateItem/:id', (req, res)=>{
    var condition = {_id: req.params.id};
    var update = getUpdateFromRequest(req);

    SprintReviewItem.update(condition, update, function(err, numAffected) {
        if (err) {
            res.json(err);
        } else {
            res.json('Item updated');
        }
    })
})

function getUpdateFromRequest(req) {
    var keys = Object.keys(req.body);
    if (keys.length !== 1) {
        return null;
    }

    switch (keys[0]) {
        case "title": 
            return {$set: { title: req.body.title}};
        case "organizer":
            return {$set: { event_organizer: req.body.organizer }};
        case "startTime":
            return {$set: { start_time: req.body.startTime }};
        case "endTime":
            return {$set: { end_time: req.body.endTime }};
        case "description":
            return {$set: { short_description: req.body.description }};
        case "meetingLink":
            return {$set: { meeting_link: req.body.meetingLink }};
        default:
            return null;
    }
}

module.exports = route;