import React from 'react';
import './BookingsControl.css'

const BookingsControl = props => {
    return (
        <div className="bookings-control">
            <button className={props.actioveOutput === 'list' ? 'active' : ''} onClick={props.changeOutputHandler.bind(this, 'list')}>List</button>
            <button className={props.actioveOutput === 'chart' ? 'active' : ''} onClick={props.changeOutputHandler.bind(this, 'chart')}>Chart</button>
        </div>
    )
}

export default BookingsControl;