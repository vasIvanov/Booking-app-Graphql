import React from 'react';
import './EventItem.css';

const EventItem = (props) => {
    
    return(
        <li key={props.eventId} className="event__list-item">
            <div>
                <h1>{props.eventTitle}</h1>
                <h2>${props.price} - {new Date(props.date).toLocaleDateString()}</h2>
            </div>
            <div>
                {props.userId === props.creatorId ? <p>You create this event.</p> : <button onClick={props.onDetail.bind(this, props.eventId)} className="btn">View Details</button> }
                
            </div>

        </li>
    )
}

export default EventItem;