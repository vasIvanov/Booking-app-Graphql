import React, {useState, useEffect, useContext} from 'react';
import AuthContext from '../context/auth-context';
import Spinner from '../components/Spinner/Spinner';
import BookingList from '../components/Bookings/BookingList';

const BookingsPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [bookings, setBookings] = useState('');
    const {token, userId} = useContext(AuthContext);
    
    useEffect(() => {
        fetchBookings();
    }, [])

    const fetchBookings = () => {
        setIsLoading(true);
        const reqBody = {
            query:`
                query {
                    bookings {
                        _id
                        createdAt
                        event {
                            _id
                            title
                            date
                        }
                    }
                }
            `
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
            console.log(res);
            
            if(res.status !== 200 && res.status !== 201) {
                throw new Error('Failed');
            }
            return res.json();
        })
        .then(resData => {
            setBookings(resData.data.bookings);
            console.log(resData);
            setIsLoading(false);
            
        })
        .catch(err => {
            console.log(err);
            setIsLoading(false);
        });

    }
    return(
        <React.Fragment>
            {isLoading  ? <Spinner/> : (
                <BookingList setBookings={setBookings} bookings={bookings} />
            )}
            
        </React.Fragment>
    )
}

export default BookingsPage;