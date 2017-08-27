import React from 'react';

import { AnalogClock }  from '../modules/AnalogClock/AnalogClock';
import { Calendar }  from '../modules/Calendar/Calendar';
import { DigitalClock }  from '../modules/DigitalClock/DigitalClock';
import { Greetings }  from '../modules/Greetings/Greetings';
import { NewsFeed }  from '../modules/NewsFeed/NewsFeed';
import { Todo }  from '../modules/Todo/Todo';
import { Quotes }  from '../modules/Quotes/Quotes';
import { Speech } from '../modules/Speech/Speech';
// import { Weather }  from '../modules/Weather/Weather';
// import { MediaPlayer }  from '../modules/MediaPlayer/MediaPlayer';


export class Module extends React.Component {

  render() {
    var componentName = [];

    this.props.modules.map((module, index) => {
      if(module !== null) {
        componentName.push(module.name);
      }
    })
    
    return(
      <div>
        {/* {console.log(this.props.reply)} */}
         {componentName.map((component, id) => {
          switch (component) {
            case "AnalogClock":
              return <AnalogClock key={id}/>
              break;
            case "Calendar":
              return <Calendar key={id}/>
              break;
            case "Greetings":
              return (
                <div>
                  <Greetings key={id} reply={this.props.reply} listening={this.props.listening} /> 
                  <Speech reply={this.props.reply} />
                </div>
              );
              break;
            case "NewsFeed":
              return <NewsFeed key={id} commandChannel={this.props.commandChannel}/>
              break;
            case "Todo":
              return <Todo key={id}/>
              break;
            case "Quotes":
              return <Quotes key={id}/>
              break;
            case "DigitalClock":
              return <DigitalClock key={id}/>
              break;
             {/* case "Weather":
              return <Weather key={id}/>
              break;
            case "MediaPlayer":
              return <MediaPlayer key={id}/>
              break;    */}
            default:
              return null
          }
        })}        
      </div>
    );
  }
}