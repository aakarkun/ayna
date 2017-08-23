import React from 'react';

export class Spinner extends React.Component {
    render() {
        return(
            <div>
                <center>
                    <div className="spinner">
                        <div className="double-bounce1"></div>
                        <div className="double-bounce2"></div>
                    </div>
                </center>
            </div>
        );
    }
}