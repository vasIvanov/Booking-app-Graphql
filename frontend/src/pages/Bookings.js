import React, {useState, useEffect, useContext} from 'react';
import AuthContext from '../context/auth-context';
import Spinner from '../components/Spinner/Spinner';
import BookingList from '../components/Bookings/BookingList';
import BookingsChart from '../components/Bookings/BookingsChart';
import BookingsControl from '../components/Bookings/BookingsControls';

const BookingsPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [bookings, setBookings] = useState('');
    const [output, setOutput] = useState('list');
    const {token, userId} = useContext(AuthContext);
    
    useEffect(() => {
        fetchBookings();
        test()
    }, [])
//--------------------------------------------------------------
    const test = () => {
        fetch('https://api.github.com/users/vasivanov/repos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            
            if(res.status !== 200 && res.status !== 201) {
                throw new Error('Failed');
            }
            return res.json();
        })
        .then(resData => {
            resData.map(e => {
                console.log(e.name);
                console.log(e.html_url);
            })

            
        })
        .catch(err => {
            console.log(err);
        });
    }
//------------------------------------------------
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
                            price
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
    const changeOutputHandler = (output) => {
        if(output === 'list') {
            setOutput('list')
        } else {
            setOutput('chart')
        }
    }
    let content = <Spinner />;
    if(!isLoading) {
        content = (
            <React.Fragment>
                <BookingsControl  changeOutputHandler={changeOutputHandler} actioveOutput={output}/>
                
                <div>
                    {output === 'list' ? <BookingList setBookings={setBookings} bookings={bookings}/> : <BookingsChart bookings={bookings}/>}
                </div>
            </React.Fragment>
        )
    }
    return(
        <React.Fragment>
          {content}
        </React.Fragment>
    )
}

export default BookingsPage;