import React from 'react';

export class NoInternet extends React.Component {
    render() {
        return(
            <div className="text-center">
                <h2>You are currently Offline.</h2>
            </div>
        );
    }
}