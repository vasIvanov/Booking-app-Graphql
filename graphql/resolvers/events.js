const {dateToString} = require('../../helpers/date');
const Event = require('../../models/event');
const {transformEvent} = require('./merge')

module.exports = {
    events: async () => {
        try {
            const events = await Event.find()
            return events.map(event => {
                return transformEvent(event);
            })
        }
        catch(err) {
            throw err;
        }
    },
    createEvent: async (args) => {
        try {
            const event = new Event({
                title:args.eventInput.title,
                description: args.eventInput.description,
                price: +args.eventInput.price,
                date: dateToString(args.eventInput.date),
                creator: '5edcc2ea146b62268465e395'
            });
            let createdEvent;
            const result = await event.save()
            createdEvent = transformEvent(result)
            const creator = await User.findById('5edcc2ea146b62268465e395');
            if(!creator) {
                throw new Error('User not found.')
            }
            creator.createdEvents.push(event);
            await creator.save();

            return createdEvent
        }
        catch(err) {
            throw err;
        }
    }
};