import React from 'react';

export class Flash extends React.Component {
    constructor(props) {
        super(props);
        
    }
    render() {
        var { type, name, content } = this.props;
        return(
            <div>
                <div className={'alert alert-' + type}>
                    <button type="button" className="close" data-dismiss="alert">x</button>
                    <strong>{ name }: </strong>{ content }
                </div>
            </div>
        ); 
    }
}