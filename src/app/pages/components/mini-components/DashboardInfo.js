import React from 'react';
import { Spinner } from './Spinner';

export class DashboardInfo extends React.Component {
    render() {
        var { count, header, subheader } = this.props;
        return(
            <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="well">
                    {
                        (count === 0) ? <Spinner /> : 
                        <div className="media">
                            <div className="badge-circle pull-left"><span style={{paddingLeft: "12px"}}>{this.props.count}</span></div>
                            <div className="media-body" style={{paddingLeft: "12px", paddingTop: "12px"}}>
                                <strong>{this.props.header}</strong>
                                <p>{this.props.subheader}: {this.props.count}</p>
                            </div>
                        </div>   
                    }
                </div>
            </div>
        );
    }
}