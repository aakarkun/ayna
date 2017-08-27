import React from 'react';
import { Spinner } from '../../pages/components/mini-components/Spinner';

function FormattedDate(props) {
    return <div>{props.date.toLocaleTimeString()}</div>
}

export class DigitalClock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            hour: '',
            minute: '',
            second: '',
            day: '',
            month: '',
            year: '',
            today: '',
            todayString: '',
            monthString: ''
        }
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        var hour = this.state.date.getHours();
        var minute = this.state.date.getMinutes();
        var second = this.state.date.getSeconds();
        var day = this.state.date.getDate();
        var month = this.state.date.getMonth();
        var year = this.state.date.getFullYear();
        var today = this.state.date.getDay();
        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
        var todayString = weekday[today];
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var monthString = months[month];
        
        this.setState({
            date: new Date(),
            hour,
            minute,
            second,
            day,
            month,
            year,
            today,
            todayString,
            monthString
        })
    }

    render() {
        const {second, minute, hour, day, month, year, today, todayString, monthString} = this.state;
        return(
            <div>
                {(!second) ? <Spinner /> :
                    <div style={{fontFamily: "Segoe Ui Light"}}>
                        <p style={{fontSize: "90px"}} className="margin-bottom-remove margin-top-remove">{hour}:{minute}
                            <sup className="">
                                <span className="margin-small-left" style={{fontSize: "24px"}}>{second}</span>
                            </sup>
                        </p>
                        <span style={{fontSize: "18px", position: "absolute", top: "125", left: "30"}}>{todayString}, {monthString} {day}</span>
                    </div>
                }
            </div>
        );
    }
}
