const Event = require('../../models/event');
const User =  require('../../models/user');
const {dateToString} = require('../../helpers/date');

const events = async (eventId) => {
    try {
        const events = await Event.find({_id: {$in: eventId}})
        return events.map(event => {
            return transformEvent(event)
        })
    }
    catch(err){
        throw err;
    }
}

const singleEvent = async eventId => {
    try {
        const event = await Event.findById(eventId);
        return transformEvent(event)
    } catch(err) {
        throw err;
    }
}

const user = async (userId) => {
    try {
        const user = await User.findById(userId)
        return {...user._doc, createdEvents: events.bind(this, user._doc.createdEvents)};
    }
    catch(err) {
        throw err;
    }
    
}

const transformEvent = event => {
    return{...event._doc, date: dateToString(event._doc.date), creator: user.bind(this, event.creator)}
}

const transformBooking = booking => {
    return {
        ...booking._doc,
        createdAt:dateToString(booking._doc.createdAt),
        updatedAt:dateToString(booking._doc.updatedAt),
        user: user.bind(this, booking._doc.user),
        event: singleEvent.bind(this, booking._doc.event)
    }
}

exports.transformBooking = transformBooking;
exports.transformEvent = transformEvent;

// exports.user = user;
// exports.events = events;
// exports.singleEvent = singleEvent;