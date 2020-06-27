const express = require('express');
const route = express.Router();

const SprintReviewItem = require('../models/sprint_review_item');
const User = require('../models/user');

// get a list of all sprint reviews
route.get('/getItemList', (req, res) => {
    // TODO: get list group by group
    SprintReviewItem.find(function(err, itemList){
        if (err) {
            res.json({success: false, message: err.message})
        } else {
            var trimItemList = [];
            itemList.forEach(item => {
                var trimItem = {
                    _id: item._id,
                    title: item.title,
                    startTime: item.start_time,
                    endTime: item.end_time,
                    remainingSlots: item.total_slots - item.self_signup_attendees_id.length,
                    description: item.short_description
                }
                trimItemList.push(trimItem);
            })
            trimItemList.sort((a, b) => (b.startTime.localeCompare(a.startTime)));
            res.json({success: true, message: 'Sprint review list retrieved successfully', itemList: trimItemList});
        }
    });
});

// get all detail about a specific sprint review
route.get('/getItem/:id', (req, res) => {
    SprintReviewItem.findById(req.params.id, function(err, itemDetail){
        if (err) { 
            res.json({success: false, message: err.message});
        } else {
            // transform self_sign_up_attendees_id array to self_sign_up_attendees_info array and send it with other item detail info back
            const query = {'_id': {$in: itemDetail.self_signup_attendees_id}};
            User.find(query, (err, attendeesInfo)=>{
                if (err) {
                    res.json({success: false, message: err.message});
                } else {
                    attendeesInfo.forEach(attendeeInfo => {
                        delete attendeeInfo.password;
                    });

                    const itemDetailWithAttendeesInfo = {
                        _id: itemDetail._id,
                        title: itemDetail.title,
                        totalSlots: itemDetail.total_slots,
                        organizer: itemDetail.event_organizer,
                        startTime: itemDetail.start_time,
                        endTime: itemDetail.end_time,
                        description: itemDetail.short_description,
                        selfSignupAttendees: attendeesInfo,
                        administratorAddedAttendees: itemDetail.administrator_added_attendees_id,
                        meetingLink: itemDetail.meeting_link
                    };
        
                    res.json({success: true, message: 'Sprint review detail retrieved successfully', itemDetail: itemDetailWithAttendeesInfo});
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
            res.json({success: false, message: 'Failed to create sprint review'});
        } else {
            res.json({success: true, message: 'Sprint review created successfully'});
        }
    });
});

// delete a sprint review
route.delete('/deleteItem/:id', (req,res)=>{
    SprintReviewItem.remove({_id: req.params.id}, function(err, result){
        if (err) { 
            res.json({success: false, message: err.message});
        } else {
            res.json({success: true, message: 'Sprint review deleted successfully'});
        }
    })
});

// update field of a sprint review
route.put('/updateItem/:id',  (req, res)=>{
    function getUpdateFromRequest(request) {
        var keys = Object.keys(request.body);
        if (keys.length !== 1) {
            return res.json({success: false, message: 'Cannot update multiple fields at one request'});
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

    SprintReviewItem.updateOne(condition, update, function(err, _) {
        if (err) {
            res.json({success: false, message: err.message});
        } else if (update === null) {
            res.json({success: false, message: 'Nothing being updated, please make sure your request body has the correct key name'});
        } else {
            res.json({success: true, message: 'Sprint review detail updated'});
        }
    })
});

// update total slots for sprintreview
route.put('/updateTotalSlots/:itemId', (req, res) => {
    if (!req.params.itemId) {
        res.json({success: false, message: 'Missing item id'});
        return;
    } 
    if (!("totalSlots" in req.body)) {
        res.json({success: false, message: 'Missing totalSlots in request body'});
        return;
    }
    SprintReviewItem.findById(req.params.itemId, (err, item)=>{
        if (err) {
            res.json({success: false, message: err.message});
        } else if (item.self_signup_attendees_id.length > req.body.totalSlots) {
            res.json({success: false, message: 'Total slots cannot be less than number of attendees already signed up'});
        } else {
            item.total_slots = req.body.totalSlots;
            item.save((err) => {
                if (err) {
                    res.json({success: false, message: err.message});
                } else {
                    res.json({success: true, message: 'Total slots updated'});
                }
            });
        }
    }); 
})


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
                    res.json({success: false, message: err.message});
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
                    res.json({success: false, message: err.message});
                } else {
                    res.json({success: true, message: 'Unregister succeed'});
                }
            });
        }
    });
});

// Admin remove a attendee signed up by themself from sprint review
route.put('/removeSelfSignupAttendee/:itemId', (req, res)=>{
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
            res.json({success: false, message: 'Cannot remove attendee since he has not signed up yet'});
        } else {
            const idx = item.self_signup_attendees_id.indexOf(req.body.userId);
            item.self_signup_attendees_id.splice(idx, 1);
            item.save((err) => {
                if (err) {
                    res.json({success: false, message: err.message});
                } else {
                    res.json({success: true, message: 'Attendee removed'});
                }
            });
        }
    });
});


module.exports = route;