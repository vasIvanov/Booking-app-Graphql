import React from 'react';
import './EventList.css';
import EventItem from './EventItem/EventItem';

const EventList = (props) => {
    const events = props.events.map(event => {
        return (
            <EventItem
                key={event._id}
                eventId={event._id} 
                eventTitle={event.title} 
                userId={props.authUserId} 
                creatorId={event.creator._id} 
                price={event.price} 
                date={event.date}
                onDetail={props.onViewDetail}
            /> 
        );
    })
    return (
        <ul className="event__list">
            {events}
        </ul>
    )
}

export default EventList