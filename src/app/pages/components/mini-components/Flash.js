import React from 'react';

export class Flash extends React.Component {
<<<<<<< HEAD
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
=======
    render() {
        return(
            <div>
                <h2>Flash</h2>
>>>>>>> 8c9b9fced4ba2c0e262cffdcbd25356aa9e131e7
            </div>
        ); 
    }
}