const express = require('express');
const route = express.Router();

const jwtHelper = require('../config/jwtHelper');
const userIdentityHelper = require('../config/userIdentityHelper');
const SprintReviewItem = require('../models/sprint_review_item');
const User = require('../models/user');

// --------------------------------- api that all users can call -----------------------------------------
// get a list of all sprint reviews
route.get('/getItemList', [jwtHelper.verifyJwtToken], (req, res) => {
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
                    description: item.short_description,
                    organizer: item.event_organizer
                }
                trimItemList.push(trimItem);
            })
            trimItemList.sort((a, b) => (b.startTime.localeCompare(a.startTime)));
            res.json({success: true, message: 'Sprint review list retrieved successfully', itemList: trimItemList});
        }
    });
});

// get all detail about a specific sprint review
route.get('/getItem/:id', [jwtHelper.verifyJwtToken], (req, res) => {
    SprintReviewItem.findById(req.params.id, function(err, itemDetail){
        if (err) { 
            res.json({success: false, message: err.message});
        } else if (!itemDetail) {
            res.json({success: false, message: 'Cannot find sprint review using the provided id'});
        } else {
            // transform self_sign_up_attendees_id array to self_sign_up_attendees_info array and send it with other item detail info back
            const query = {'_id': {$in: itemDetail.self_signup_attendees_id}};
            User.find(query, (err, attendeesInfoRaw)=>{
                if (err) {
                    res.json({success: false, message: err.message});
                } else {
                    let attendeesInfo = [];
                    attendeesInfoRaw.forEach(attendeeInfoRaw => {
                        const attendeeInfo = {
                            _id: attendeeInfoRaw._id,
                            name: attendeeInfoRaw.name,
                            email: attendeeInfoRaw.email,
                            privilege: attendeeInfoRaw.privilege
                        };
                        attendeesInfo.push(attendeeInfo);
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
                        administratorAddedAttendees: itemDetail.administrator_added_attendees,
                        meetingLink: itemDetail.meeting_link
                    };
        
                    res.json({success: true, message: 'Sprint review detail retrieved successfully', itemDetail: itemDetailWithAttendeesInfo});
                }
            })
        }
    })
});

// sign up attendee for sprint review
route.put('/attendeeSignup/:itemId', [jwtHelper.verifyJwtToken], (req, res)=>{

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
        } else if (!item) {
            res.json({success: false, message: 'Cannot find sprint review using provided id'});
        } else if (item.self_signup_attendees_id.includes(req.body.userId)) {
            res.json({success: false, message: 'You have already signed up'});
        } else if (item.self_signup_attendees_id.length >= item.total_slots) {
            res.json({success: false, message: 'No open slots available'});
        } else {
            item.updateOne({$push: {self_signup_attendees_id: req.body.userId }}, (err) => {
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
route.put('/attendeeUnregister/:itemId', [jwtHelper.verifyJwtToken], (req, res)=>{

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
        } else if (!item) {
            res.json({success: false, message: 'Cannot find sprint review using provided id'});
        } else if (!item.self_signup_attendees_id.includes(req.body.userId)) {
            res.json({success: false, message: 'Cannot unregister since you have not signed up yet'});
        } else {
            item.updateOne({$pull: {self_signup_attendees_id: req.body.userId}}, (err) => {
                if (err) {
                    res.json({success: false, message: err.message});
                } else {
                    res.json({success: true, message: 'Unregister succeed'});
                }
            });
        }
    });
});

// --------------------------------------------- api that only admin can call ------------------------------------
// create a new sprint review
route.post('/addItem', [jwtHelper.verifyJwtToken, userIdentityHelper.verifyUserAdminPrivilege], (req, res)=>{
    var newItem = new SprintReviewItem({
        title: req.body.title,
        total_slots: req.body.totalSlots,
        event_organizer: req.body.organizer,
        short_description: req.body.description,
        start_time: req.body.startTime,
        end_time: req.body.endTime
    });
    
    if (req.body.meetingLink) 
        newItem.meeting_link = req.body.meetingLink;

    newItem.save((err, item)=>{
        if(err){
            res.json({success: false, message: 'Failed to create sprint review'});
        } else {
            res.json({success: true, message: 'Sprint review created successfully'});
        }
    });
});

// delete a sprint review
route.delete('/deleteItem/:id', [jwtHelper.verifyJwtToken, userIdentityHelper.verifyUserAdminPrivilege], (req, res)=>{
    SprintReviewItem.remove({_id: req.params.id}, function(err, result){
        if (err) { 
            res.json({success: false, message: err.message});
        } else {
            res.json({success: true, message: 'Sprint review deleted successfully'});
        }
    })
});

// update field of a sprint review
route.put('/updateItem/:id',  [jwtHelper.verifyJwtToken, userIdentityHelper.verifyUserAdminPrivilege], (req, res)=>{
    function getUpdateFromRequest(request) {
        switch (Object.keys(request.body)[0]) {
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

    if (Object.keys(req.body).length !== 1) {
        return res.json({success: false, message: 'Only 1 field is allowed to update at one request'});
    }

    var condition = {_id: req.params.id};
    var updateCondition = getUpdateFromRequest(req);

    SprintReviewItem.updateOne(condition, updateCondition, function(err, _) {
        if (err) {
            res.json({success: false, message: err.message});
        } else if (updateCondition === null) {
            res.json({success: false, message: 'Nothing being updated, please make sure your request body has the correct key name'});
        } else {
            res.json({success: true, message: 'Sprint review detail updated'});
        }
    })
});

// update total slots for sprintreview
route.put('/updateTotalSlots/:itemId', [jwtHelper.verifyJwtToken, userIdentityHelper.verifyUserAdminPrivilege], (req, res) => {
    if (!req.params.itemId) {
        return res.json({success: false, message: 'Missing item id'});
    } else if (!("totalSlots" in req.body)) {
        return res.json({success: false, message: 'Missing totalSlots in request body'});
    } 
    
    const newTotalSlots = Number(req.body.totalSlots);
    if (!Number.isInteger(newTotalSlots)) {
        return res.json({success: false, message: 'Total slots should be an integer'});
    } else if (newTotalSlots < 0) {
        return res.json({success: false, message: 'Total slots should be no less than 0'});
    }

    // TODO: user that is not admin cannot update total slots
    SprintReviewItem.findById(req.params.itemId, (err, item)=>{
        if (err) {
            res.json({success: false, message: err.message});
        } else if (!item) {
            res.json({success: false, message: 'Cannot find sprint review using provided id'});
        } else if (item.self_signup_attendees_id.length > newTotalSlots) {
            res.json({success: false, message: 'Total slots cannot be less than number of attendees already signed up'});
        } else {
            item.updateOne({$set: {total_slots : newTotalSlots}}, (err) => {
                if (err) {
                    res.json({success: false, message: err.message});
                } else {
                    res.json({success: true, message: 'Total slots updated'});
                }
            });
        }
    }); 
})

// Admin remove a attendee signed up by themself from sprint review
route.put('/removeSelfSignupAttendee/:itemId', [jwtHelper.verifyJwtToken, userIdentityHelper.verifyUserAdminPrivilege], (req, res)=>{
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
            res.json({success: false, message: err.message});
        }  else if (!item) {
            res.json({success: false, message: 'Cannot find sprint review using provided id'});
        }  else if (!item.self_signup_attendees_id.includes(req.body.userId)) {
            res.json({success: false, message: 'Cannot remove attendee since he has not signed up yet'});
        } else {
            item.updateOne({$pull: {self_signup_attendees_id: req.body.userId}}, (err) => {
                if (err) {
                    res.json({success: false, message: err.message});
                } else {
                    res.json({success: true, message: 'Attendee removed'});
                }
            });
        }
    });
});

// admin added attendee to sprint review
route.put('/adminAddAttendee/:itemId', [jwtHelper.verifyJwtToken, userIdentityHelper.verifyUserAdminPrivilege], (req, res)=>{
    if (!req.params.itemId) {
        return res.json({success: false, message: 'Missing item id'});
    } else if (!('newAttendee' in req.body)) {
        return res.json({success: false, message: 'Missing newAttendee in request body'});
    } else if (Array.isArray(req.body.newAttendee)) {
        return res.json({success: false, message: 'Value of newAttendee should not be array'});
    } else if (!req.body.newAttendee.name || !req.body.newAttendee.email) {
        return res.json({success: false, message: 'Name or email cannot be empty'});
    }

    SprintReviewItem.findById(req.params.itemId, (err, item)=>{
        if (err) {
            res.json({success: false, message: err.message});
        } else if (!item) {
            res.json({success: false, message: 'Cannot find sprint review using provided id'});
        } else {
            const newAttendee = {name: req.body.newAttendee.name, email: req.body.newAttendee.email};
            item.updateOne({$push: {administrator_added_attendees: newAttendee}}, (err) => {
                if (err) {
                    res.json({success: false, message: err.message});
                } else {
                    res.json({success: true, message: 'Attendee added'});
                }
            });
        }
    });
});

// admin remove attendee he/she added before from sprint review
route.put('/removeAdminAddedAttendee/:itemId', [jwtHelper.verifyJwtToken, userIdentityHelper.verifyUserAdminPrivilege], (req, res)=>{
    if (!req.params.itemId) {
        res.json({success: false, message: 'Missing item id'});
        return;
    } 
    if (!('attendeeObjId' in req.body)) {
        res.json({success: false, message: 'Missing attendee object id'});
        return;
    }

    SprintReviewItem.findById(req.params.itemId, (err, item)=>{
        if (err) {
            res.json({success: false, message: err.message});
        } else if (!item) {
            res.json({success: false, message: 'Cannot find sprint review using provided id'});
        } else {
            const query = {$pull: {administrator_added_attendees: {_id: req.body.attendeeObjId}}};
            item.updateOne(query, (err, raw)=>{
                if (err) {
                    res.json({success: false, message: err.message});
                } else if (raw.nModified === 0){
                    res.json({success: false, message: 'Cannot find administrator added attendees using id in request body'});
                } else {
                    res.json({success: true, message: 'Attendee removed'});
                }
            });
        }
    });
});

module.exports = route;