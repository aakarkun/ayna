import React from 'react';

export class Speech extends React.Component{
    
	render(){
        var utterance = new SpeechSynthesisUtterance(this.props.reply);
        var voices = speechSynthesis.getVoices();
        utterance.voice = voices[5];

        return(
            <div>
                {(this.props.reply !== "hello") ? 
                speechSynthesis.speak(utterance) : console.log("nothing to speak")
                }
            </div>
        );
	}
}