import React from 'react';

export class Speech extends React.Component{
    constructor(props) {
        super(props);
    }
	render(){
        return(
            <div>
                {(this.props.reply !== "hello") ? 
                    speechSynthesis.speak(new SpeechSynthesisUtterance(this.props.reply)) : console.log("nothing to speak")
                }
            </div>
        );
	}
}