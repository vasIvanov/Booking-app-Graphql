import React, { useState, useContext, useEffect } from 'react';
import './Events.css'
import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import AuthContext from '../context/auth-context';
import EventList from '../components/Events/EventList';
import Spinner from '../components/Spinner/Spinner';

const EventsPage = () => {
    const [creating, setCreating] = useState(false);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const {token, userId} = useContext(AuthContext);
    const [events, setEvents] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    let isActive = true;

    useEffect(() => {
        fetchEvents()
        return () => {
            isActive= false;
        }
    }, []);
    
    const fetchEvents = () => {
        setIsLoading(true);
        const reqBody = {
            query:`
                query {
                    events{
                        _id
                        title
                        description
                        date
                        price
                        creator {
                            _id
                            email
                        }
                    }
                }
            `
        };
    
        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json'
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
            if(isActive) {
                console.log(resData);
                
                setEvents(resData.data.events);
                setIsLoading(false);
            }
        })
        .catch(err => {
            console.log(err);
            if(isActive) {
                setIsLoading(false);
            }
        });

    }
    
    const modalConfirm = () => {
        setCreating(false);
        console.log(title, price, date, description);
        
        if(!title || !price || !date || !description) return;

        const event = {title, price, date, description}
        console.log(event);
        const reqBody = {
            query:`
                mutation CreateEvent($title: String!, $description: String!, $price: Float!, $date: String!){
                    createEvent(eventInput: {title: $title, description: $description, price: $price, date: $date}){
                        _id
                        title
                        description
                        date
                        price
                    }
                }
            `,
            variables: {
                title,
                description,
                price,
                date
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
            const updatedEvents = [...events];
            updatedEvents.push({
                _id: resData.data.createEvent._id,
                title: resData.data.createEvent.title,
                description: resData.data.createEvent.description,
                price: resData.data.createEvent.price,
                date: resData.data.createEvent.date,
                creator: {
                    _id: userId,
                }
            });
            setEvents(updatedEvents);
        })
        .catch(err => {
            console.log(err);
        });
        
    }

    const modalCancel = () => {
        setCreating(false);
        setSelectedEvent(null);
    }

    const showDetail = (eventId) =>{
        const event = events.find(e => e._id === eventId);
        setSelectedEvent(event)
    }

    const bookEvent = () => {
        if(!token) {
            setSelectedEvent(null);
            return;
        }
        const reqBody = {
            query:`
                mutation BookEvent($eventId: ID!){
                    bookEvent(eventId: $eventId){
                        _id
                        createdAt
                        updatedAt
                        user{
                            email
                        }
                    }
                }
            `,
            variables: {
                eventId: selectedEvent._id
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
            console.log(resData);
            setSelectedEvent(null);
        })
        .catch(err => {
            console.log(err);
        });
    }

    return(
        <React.Fragment>
            {(creating || selectedEvent)  && <Backdrop />}
            {creating && <Modal title="Add Event" canCancel canConfirm onCancel={modalCancel} onConfirm={modalConfirm} confirmText='Confrim'>
                <form>
                    <div className="form-control">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" onChange={(e) => setTitle(e.target.value)}/>
                    </div>   
                    <div className="form-control">
                        <label htmlFor="price">Price</label>
                        <input type="number" id="price" onChange={(e) => setPrice(+e.target.value)}/>
                    </div> 
                    <div className="form-control">
                        <label htmlFor="date">Date</label>
                        <input type="datetime-local" id="date" onChange={(e) => setDate(e.target.value)}/>
                    </div>
                    <div className="form-control">
                        <label htmlFor="description">Description</label>
                        <textarea  id="description" rows="4" onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                </form>    
            </Modal>}

            {selectedEvent &&  <Modal title={selectedEvent.title} canCancel canConfirm onCancel={modalCancel} onConfirm={bookEvent} confirmText={token ? 'Book' : 'Confirm'}>
                  <h1>{selectedEvent.title}</h1>
                  <h2>${selectedEvent.price} - {new Date(selectedEvent.date).toLocaleDateString()}</h2>
                  <p>{selectedEvent.description}</p>
            </Modal>}

            {token && <div className="events-control">
                <p>Create your own Events</p>
                <button className="btn" onClick={() => setCreating(true)}>Create Event</button>
            </div>}
            {events && !isLoading ? <EventList authUserId={userId} events={events} onViewDetail={showDetail}/> : <Spinner />}
        </React.Fragment>
    )
}

export default EventsPage;