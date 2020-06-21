import React, {useContext, useState} from 'react';
import './BookingList.css';
import AuthContext from '../../context/auth-context';

const BookingList = props => {
    const {token, userId} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);

    const onDelete = (bookingId) => {
        setIsLoading(true);
        const reqBody = {
            query:`
                mutation CancelBooking($id: ID!) {
                    cancelBooking(bookingId: $id){
                        _id
                        title
                    }
                }
            `,
            variables: {
                id: bookingId
            }
        };
    
        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            credentials: 'include'
        })
        .then(res => {
            if(res.status !== 200 && res.status !== 201) {
                throw new Error('Failed');
            }
            return res.json();
        })
        .then(resData => {
            const updatedBookings = props.bookings.filter(booking => {
                return booking._id !== bookingId;
            })
            props.setBookings(updatedBookings);
            
            setIsLoading(false);
            
        })
        .catch(err => {
            console.log(err);
            setIsLoading(false);
        });
    }
    
    return (
        <ul className='bookings__list'>
            {props.bookings && props.bookings.map(booking => {
                return (<li key={booking._id} className='bookings__item'>
                    <div className='bookings__item-data'>
                        {booking.event.title} - {' '}
                        {new Date(booking.createdAt).toLocaleDateString()}
                    </div>
                    <div className='bookings__item-actions'>
                        <button onClick={onDelete.bind(this, booking._id)} className="btn">Cancel</button>
                    </div>
                </li>)
            })}
        </ul>
    )
}

export default BookingList;