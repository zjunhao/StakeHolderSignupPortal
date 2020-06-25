const express = require('express');
const route = express.Router();

const SprintReviewItem = require('../models/sprint_review_item');
const User = require('../models/user');

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
    SprintReviewItem.findById(req.params.id, function(err, itemDetail){
        if (err) { 
            res.json(err);
        } else {
            // transform self_sign_up_attendees_id array to self_sign_up_attendees_info array and send it with other item detail info back
            const query = {'_id': {$in: itemDetail.self_signup_attendees_id}};
            User.find(query, (err, rawAttendeesInfo)=>{
                if (err) {
                    res.json(err);
                } else {
                    let attendeesInfo = [];
                    rawAttendeesInfo.forEach(rawAttendeeInfo => {
                        const attendeeInfo = {
                            _id: rawAttendeeInfo._id,
                            email: rawAttendeeInfo.email,
                            name: rawAttendeeInfo.name,
                            privilege: rawAttendeeInfo.privilege
                        };
                        attendeesInfo.push(attendeeInfo);
                    });

                    const itemDetailWithAttendeesInfo = {
                        _id: itemDetail._id,
                        title: itemDetail.title,
                        total_slots: itemDetail.total_slots,
                        event_organizer: itemDetail.event_organizer,
                        start_time: itemDetail.start_time,
                        end_time: itemDetail.end_time,
                        short_description: itemDetail.short_description,
                        self_signup_attendees: attendeesInfo,
                        administrator_added_attendees: itemDetail.administrator_added_attendees_id,
                        meeting_link: itemDetail.meeting_link
                    };
        
                    res.json(itemDetailWithAttendeesInfo);
                }
            })
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
    function getUpdateFromRequest(request) {
        var keys = Object.keys(request.body);
        if (keys.length !== 1) {
            return null;
        }
    
        switch (keys[0]) {
            case "title": 
                return {$set: { title: request.body.title}};
            case "organizer":
                return {$set: { event_organizer: request.body.organizer }};
            case "startTime":
                return {$set: { start_time: request.body.startTime }};
            case "endTime":
                return {$set: { end_time: request.body.endTime }};
            case "description":
                return {$set: { short_description: request.body.description }};
            case "meetingLink":
                return {$set: { meeting_link: request.body.meetingLink }};
            default:
                return null;
        }
    }

    var condition = {_id: req.params.id};
    var update = getUpdateFromRequest(req);
    SprintReviewItem.update(condition, update, function(err, numAffected) {
        if (err) {
            res.json(err);
        } else if (update === null) {
            res.json('Nothing being updated, please make sure your request body has the correct key name');
        } else {
            res.json('Item updated');
        }
    })
});

// sign up attendee for sprint review
route.put('/attendeeSignup/:itemId', (req, res)=>{

    if (!req.params.itemId) {
        res.json({success: false, message: 'Missing item id'});
        return;
    } 
    if (!req.body.userId) {
        res.json({success: false, message: 'Missing user id'});
        return;
    }

    SprintReviewItem.findById(req.params.itemId, (err, item)=>{
        if (err) {
            res.json({success: false, message: 'Item id does not exist'});
        } else if (item.self_signup_attendees_id.includes(req.body.userId)) {
            res.json({success: false, message: 'You have already signed up'});
        } else if (item.self_signup_attendees_id.length >= item.total_slots) {
            res.json({success: false, message: 'No open slots available'});
        } else {
            item.self_signup_attendees_id.push(req.body.userId);
            item.save((err) => {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    res.json({success: true, message: 'Sign up succeed'});
                }
            });
        }
    });
});

// attendee unregister for sprint review
route.put('/attendeeUnregister/:itemId', (req, res)=>{

    if (!req.params.itemId) {
        res.json({success: false, message: 'Missing item id'});
        return;
    } 
    if (!req.body.userId) {
        res.json({success: false, message: 'Missing user id'});
        return;
    }

    SprintReviewItem.findById(req.params.itemId, (err, item)=>{
        if (err) {
            res.json({success: false, message: 'Item id does not exist'});
        } else if (!item.self_signup_attendees_id.includes(req.body.userId)) {
            res.json({success: false, message: 'Cannot unregister since you have not signed up yet'});
        } else {
            const idx = item.self_signup_attendees_id.indexOf(req.body.userId);
            item.self_signup_attendees_id.splice(idx, 1);
            item.save((err) => {
                if (err) {
                    res.json({success: false, message: err});
                } else {
                    res.json({success: true, message: 'Unregister succeed'});
                }
            });
        }
    });
});

module.exports = route;