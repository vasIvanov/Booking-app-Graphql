import React from 'react';
var BarChart = require("react-chartjs").Bar;

const BOOKINGS_BUCKETS ={
    Cheap: {max: 100, min: 0},
    Normal: {max:200, min: 100},
    Expensive: {max: 1000000, min: 200}
}



const BookingsChart = props => {
    let values = []
    const data = {labels: [], datasets: []};
    for(const bucket in BOOKINGS_BUCKETS) {
        const filteredBookings = props.bookings.reduce((prev, current) => {
            console.log(current.event.price, BOOKINGS_BUCKETS[bucket]);
            
            if(current.event.price > BOOKINGS_BUCKETS[bucket].min && current.event.price < BOOKINGS_BUCKETS[bucket].max) {

                return prev + 1
            } else {
                return prev
            }
        }, 0);
        values.push(filteredBookings)
        data.labels.push(bucket);
        data.datasets.push({
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: values
        });
        values = [...values];
        values[values.length - 1] = 0
    }
    
    return (
      <div style={{textAlign: 'center'}}>
        <BarChart data={data} />
      </div>
    );
}

export default BookingsChart;