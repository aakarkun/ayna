import React from 'react';

export class ModuleComponent extends React.Component {
    render() {
        return(
            <div className="col-lg-4 col-md-4 col-sm-4">
                <div className="media">
                    <div className="badge-circle-bg pull-left"><span style={{paddingLeft: "12px"}}>{this.props.name.substring(0,2)}</span></div>
                    <div className="media-body" style={{paddingLeft: "12px", }}>
                        <strong style={{fontSize: "16px"}}>{this.props.name}</strong>
                        <p>
                            <strong>Category:</strong> {this.props.category}<br />
                            <strong>Downloads:</strong> {this.props.downloads} Downloads
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}