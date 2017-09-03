import React from 'react';

export class MiniSpinner extends React.Component {
    render() {
        return(
            <div>
                <center>
                    <span className="mini-spinner">
                        <div className="spinner">
                            <div className="double-bounce1"></div>
                            <div className="double-bounce2"></div>
                        </div>
                    </span>    
                </center>
            </div>
        );
    }
}