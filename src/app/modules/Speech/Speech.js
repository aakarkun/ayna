import React from 'react';

export class Speech extends React.Component{
    constructor(props) {
        super(props);
    }
	render(){
        var utterance = new SpeechSynthesisUtterance();
        var voices = speechSynthesis.getVoices();
        utterance.voice = voices[4];

        return(
            <div>
                {(this.props.reply !== "hello") ? 
                    utterance.speak(this.props.reply) : console.log("nothing to speak")
                }
            </div>
        );
	}
}