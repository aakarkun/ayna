import React from 'react';

import { AnalogClock }  from '../modules/AnalogClock/AnalogClock';
import { Calendar }  from '../modules/Calendar/Calendar';
import { Clock }  from '../modules/Clock/Clock';
import { Greetings }  from '../modules/Greetings/Greetings';
import { NewsFeed }  from '../modules/NewsFeed/NewsFeed';
import { Todo }  from '../modules/Todo/Todo';
import { Quotes }  from '../modules/Quotes/Quotes';
import { Weather }  from '../modules/Weather/Weather';
import { MediaPlayer }  from '../modules/MediaPlayer/MediaPlayer';


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
         {componentName.map((component, id) => {
          switch (component) {
            case "AnalogClock":
              return <AnalogClock key={id}/>
              break;
            case "Calendar":
              return <Calendar key={id}/>
              break;
            case "Clock":
              return <Clock key={id}/>
              break;
            case "Greetings":
              return <Greetings key={id}/>
              break;
            case "NewsFeed":
              return <NewsFeed key={id}/>
              break;
            case "Todo":
              return <Todo key={id}/>
              break;
            case "Quotes":
              return <Quotes key={id}/>
              break;
             case "Weather":
              return <Weather key={id}/>
              break;
            case "MediaPlayer":
              return <MediaPlayer key={id}/>
              break;   
            default:
              return null
          }
        })}        
      </div>
    );
  }
}