const mongoose = require('mongoose');

const AdminAddedAttendeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
})

const SprintReviewItemSchema = mongoose.Schema({
    // title of sprint review
    title: {
        type: String,
        required: true  
    },
    // how many slots are available in total for this sprint review
    total_slots: {
        type: Number,
        required: true
    },
    // organizer of this sprint review
    event_organizer: {
        type: String,
        required: true
    },
    // what time this sprint review starts
    start_time: {
        type: String,
        required: true
    },
    // what time this sprint review ends
    end_time: {
        type: String,
        required: true
    },
    // short description about this sprint review
    short_description: {
        type: String,
        required: true
    },
    // id of sprint review attendees signup themselves
    self_signup_attendees_id: {
        type: [String],
        required: false
    },
    // sprint review attendees add by administrator
    // attendees here does not take total slots
    administrator_added_attendees: {
        type: [AdminAddedAttendeeSchema],
        required: false
    },
    // zoom link meeting for this sprint review
    meeting_link: {
        type: String,
        required: false
    }
});

const SprintReview = module.exports = mongoose.model('SprintReview', SprintReviewItemSchema);