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
        var weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
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
        var {second, minute, hour, day, month, year, today, todayString, monthString} = this.state;
        hour = ((hour<10)?('0'+hour):hour);
        minute = ((minute<10)?'0'+minute:minute);
        var _second = ((second<10)?'0'+second:second);
        
        return(
            <div>
                {(!second) ? <Spinner /> :
                    <div style={{fontFamily: "Roboto"}}>
                        <p style={{fontSize: "80px"}} className="margin-bottom-remove margin-top-remove">
                            {hour}:{minute}
                            <sup className="">
                                <span className="margin-small-left" style={{fontSize: "24px"}}>{_second}</span>
                            </sup>
                        </p>
                        <span style={{fontSize: "18px", position: "absolute", top: "110px", left: "20px", width: "max-content"}}>{todayString} {monthString} {day}</span>
                    </div>
                }
            </div>
        );
    }
}
