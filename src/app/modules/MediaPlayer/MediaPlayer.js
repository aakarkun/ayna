import React from 'react';
import { Media, Player, controls } from 'react-media-player';
const { PlayPause, MuteUnmute } = controls;

export class MediaPlayer extends React.Component {
    render() {
        return(
            <Media>
                <div className="media">
                    <div className="media-player">
                        <Player src="https://youtu.be/uN1yB17S2bk"/>
                    </div>    
                    <div className="media-controls">
                        <PlayPause/>
                        <MuteUnmute/>
                    </div>
                </div>
            </Media>
        );
    }
}