import React from 'react';

export class MusicPlayer extends React.Component {
    constructor(props) {
        super(props);

        this.play = this.play.bind(this);
        this.pause = this.pause.bind(this);
        this.volume = this.volume.bind(this);
        this.volume = this._volume.bind(this);
    }

    
    play() {
        console.log("Playing...");
        document.getElementById('player').play();        
    }
    
    pause() {
        document.getElementById('player').pause();                
    }
    
    volume() {
        document.getElementById('player').volume += 0.1;
    }
    
    _volume() {
        document.getElementById('player').volume -= 0.1;
    }
    
    componentDidMount() {
        this.play;
        this.pause;
        this.volume;
        this._volume;
    }
    

    render() {
        var mp3 = [
            {
                id: "0",
                name: "Charlie Puth - Attention",
                url: "https://doc-0o-98-docs.googleusercontent.com/docs/securesc/v3ufo5arv2g1opvm8rm2eks72u7tpjgo/bt18q6639u5tsn2gl82spf42qr0140qs/1504713600000/16260873830042339213/16260873830042339213/0B1D3badzzR_mTGdWSTRuYTJaS1k?e=download"
            },
            {
                id: "1",
                name: "Ed Sheeran - How Would You Feel",
                url: "https://doc-14-98-docs.googleusercontent.com/docs/securesc/v3ufo5arv2g1opvm8rm2eks72u7tpjgo/8j9ospe4s5s7s47i685ag1sp5673bi1t/1504728000000/16260873830042339213/16260873830042339213/0B1D3badzzR_mcnA3NGQ5RzZSbms?e=download"
            },
            {
                id: "2",
                name: "Ed Sheeran - Perfect",
                url: "https://doc-14-98-docs.googleusercontent.com/docs/securesc/v3ufo5arv2g1opvm8rm2eks72u7tpjgo/63hvle9ioejp5pmsmfmgtg9vugqt8u97/1504728000000/16260873830042339213/16260873830042339213/0B1D3badzzR_mcmdLTG0xUXFyS1k?e=download"
            },
            {
                id: "3",
                name: "James Arthur - Say You Wont Let Go",
                url: "https://doc-00-98-docs.googleusercontent.com/docs/securesc/v3ufo5arv2g1opvm8rm2eks72u7tpjgo/nrv5e93ebb77f7d9ejqr8n1m65fnhai5/1504728000000/16260873830042339213/16260873830042339213/0B1D3badzzR_mX2RST2xHaGgzUGc?e=download"
            },
            {
                id: "4",
                name: "Linkin Park - Heavy",
                url: "https://doc-08-98-docs.googleusercontent.com/docs/securesc/v3ufo5arv2g1opvm8rm2eks72u7tpjgo/pgf3r8acvlaia8eafo1pletuurr9hr0a/1504728000000/16260873830042339213/16260873830042339213/0B1D3badzzR_mZ0RyaFJMU1J4WU0?e=download"
            },
            {
                id: "5",
                name: "Linkin Park - One More Light",
                url: "https://doc-08-98-docs.googleusercontent.com/docs/securesc/v3ufo5arv2g1opvm8rm2eks72u7tpjgo/59ktvba3u238ja1cfq1dea4dat6vdrod/1504728000000/16260873830042339213/16260873830042339213/0B1D3badzzR_mQmtzMllGRlQ3TGs?e=download"
            }
        ]
        var musicId = Math.floor((Math.random() * mp3.length));
        return(
            <div className="row" style={{float: "left"}}>
                <div className="col-lg-6 col-md-6 col-sm-6" style={{paddingRight: "0px"}}>
                    <div className="valign-wrapper">
                        <marquee direction="up" style={{height: "180px", marginLeft: "8px"}}><h6>{mp3[musicId].name}</h6></marquee>                
                    </div>
                </div>                
                <div className="col-lg-6 col-md-6 col-sm-6" style={{paddingLeft: "0px"}}>
                <audio id='player' refs="player" src={mp3[musicId].url}></audio>
                    <div style={{height: "180px"}}> 
                        <button className="player play" onClick={this.play}><i className="fa fa-play-circle" /></button>
                        <button className="player pause" onClick={this.pause}><i className="fa  fa-pause-circle" /></button> 
                        <button className="player volume" onClick={this.volume}><i className="fa fa-volume-up" /></button> 
                        <button className="player volume" onClick={this._volume}><i className="fa fa-volume-down" /></button> 
                    </div>
                </div>
            </div>
        );
    }
}