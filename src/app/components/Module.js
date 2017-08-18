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
  constructor() {
    super();
    this.state = {
      /*defaultModules: [ 
        {
          module: "Clock" 
        },
        {
          module: "Greetings"
        },
        {
          module: "Calendar"
        },
        {
          module: "AnalogClock"
        }
    ],*/
      userModules: [],
      componentName: []
    };
  }
  
  /*htmlDecode(input) {
    var e = document.createElement('div');
    e.innerHTML = input;
    console.log(e.childNodes[0]);
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }*/

  componentWillMount() {  
    var uModules = this.state.userModules;
    // console.log(uModules);
    // var dModules = this.state.defaultModules;
    // console.log(dModules);
    this.props.modules.map((module, name) =>{
      // console.log(module);
      if(module !== null) {
        uModules.push(module);
        // var html = "&lt;" + module.name + " /&gt;";
        // var html = "<" + module.name + " />";
        var html = module.name;        
        this.state.componentName.push(html);
        // console.log(this.state.componentName);
        
        /* try{
          var mname = module.name;
          var filelocation = "../modules/" + mname + "/" + mname + ".js"; 
          var script = document.createElement("script");
          script.src = filelocation;
          script.onload = function() {

          }
          script.setAttribute("type", "application/json");
          document.getElementsByTagName("head")[0].appendChild(script);
        } catch (err) {
          console.log("Error: " + module.name + ".js not found! " + err);
          console.log("Error: " + err);
        } */
      }
      // console.log("newHtml :" + this.state.newHtml);
    });
  }

  render() {
      var { componentName } = this.state;
      /* function createHtml() {
        for(var i = 0; i < componentName.length; i++) {
          return {__html: ComponentName[i]};
        }
      }

      function Component() {
        return <div dangerouslySetInnerHTML={createHtml()} />
      } */
    return(
      <div>
        {/* {Component()} */}
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