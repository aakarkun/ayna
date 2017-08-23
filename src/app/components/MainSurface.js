import React from 'react';

import { SurfaceArea } from './SurfaceArea';
import { isLoggedIn } from '../utils/users-api';
import { getDefaultModules, changePosition } from '../utils/modules-api';

import annyang from 'annyang';

export class MainSurface extends React.Component {
  constructor() {
    super();
    this.state = {
      modules: [],
      surfaces : {
        top_bar: [],
        hero_section: [],
        middle_center: [],
        lower_section: [],
        bottom_bar: []
      },
      replies: [
        {
          command: "hello",
          text: [
            "Hello. How's it going?",
            "Hey, there",
            "Hi. Whats up!",
            "Hello to you too",
            "Is it me you're looking for?"
          ]
        },
        {
          command: "how are you",
          text: [
            "Living the AI dream.",
            "I'm doing well. What about you?",
            "hmm. I'm fine I guess",
            "I'm feeling electrified.",
            "I'm well."
          ]
        },
        {
          command: "goodnight",
          text: [
            "I seem to have hit a hiccup. Check back in a few",
            "Rest up sleepy head. I will talk to you tomorrow.",
            "Goodnight to you too. Remember tomorrow is just another day.",
            ]
        },
        {
          command: "who are you",
          text: [
            "Empresa. I'm your personal assistant."
          ]
        },
        {
          command: "goodmorning",
          text: [
            "Good morning, I hope you slept well.",
            "Good morning to you, too.",
            "Good morning, I hope you're well."
          ]
        },
        {
          command: "good afternoon",
          text: [
            "Midday greetings to you, too.",
            "Good afternoon, I hope the day is going well. Any dinner plans?"
          ]
        }
      ],
      toDisplay: 'hello',
      // messages: ["Hello.", "Hi, how are you?", "Hi. Whats up! 👻"],
      // secondMessages: ["Living the AI dream.", "I'm doing well. What about you?", "hmm. I'm fine I guess 👻"]
    };

    this.acceptVoiceCommands = this.acceptVoiceCommands.bind(this);
  }

  defaultModules() {
    getDefaultModules().then((modules) => {
      // defining the valid surfaces
      var validSurfaces = ["top_bar", "hero_section", "middle_center", "lower_section", "bottom_bar"];
      var surfaces = {
        top_bar: [],
        hero_section: [],
        middle_center: [],
        lower_section: [],
        bottom_bar: []
      };
      // pushing the appropriate modules in corresponding surface areas
      if(modules.length !== 0) {
        modules.map((module, id) => {
          if(module.surface_area !== null && validSurfaces.indexOf(module.surface_area) !== -1){
            surfaces[module.surface_area].push(module);
          } else {
            console.log("Error: Surface area is not defined for " + module.name + ".");
          }
          return module;
        });
      } else {
        console.log("Error: No modules found!");
      }

      this.setState({
        modules,
        surfaces
      })
    })
  }

  acceptVoiceCommands() {

    var availableModules = [];
    var replies = this.state.replies;

    var toDisplay = '';

    annyang.debug();

    annyang.setLanguage('en-IN');
    getDefaultModules().then((modules) => {
      availableModules = modules;
      var commands = {
        'show (me) :moduleName': function(moduleName) {
          console.log(moduleName);
        },
        
        // 'move (that) :moduleName to (the) :newPosition': {'regexp': /^move (clock|weather|news|calendar|greetings|quote|todo|) to (the) (left|centre|right)$/, 'callback': function(moduleName, newPosition) {
        // }.bind(this)},
  
        'move (that) :moduleName to (the) :newPosition': function(moduleName, newPosition) {
          // console.log(availableModules);
          if(newPosition === 'centre') {
            newPosition = 'center';
          }
          if(newPosition === 'write') {
            newPosition = 'right';
          }
          if(moduleName === 'clock') {
            moduleName = 'analogclock'
          }
          if(moduleName === 'news' | moduleName === 'feed') {
            moduleName = 'newsfeed'
          }
          if(moduleName === 'codes') {
            moduleName = 'quotes'
          }

          if(newPosition === 'left' | newPosition === 'right' | newPosition === 'center') {
            
            availableModules.map((aModule, index) => {

              if(aModule.name.toLowerCase() === moduleName && aModule.position !== newPosition) {
                console.log("Modules Matched previously " + aModule.name.toLowerCase() + " was in " + aModule.position);
                aModule.position = newPosition;
                console.log("now " + aModule.name + " is in " + aModule.position);
                changePosition(aModule._id, newPosition).then(data => {
                  console.log(data);
                })
                window.location.reload();
              } else {
                console.log("Module Not Matched or same position call");
              }
            });
          } else {
            console.log("Position not matched!")
          }
        }.bind(this),
  
        '(hello) (hi) (hey)': function() {
          var num;
          num = Math.floor((Math.random() * replies[0].text.length));
          toDisplay = replies[0].text[num];
          this.setState({
            toDisplay
          })
          console.log(this.state.toDisplay);
        }.bind(this),
        
        'how are you': function() {
          var num;
          num = Math.floor((Math.random() * replies[1].text.length));
          toDisplay = replies[1].text[num];
          this.setState({
            toDisplay
          })
          console.log(this.state.toDisplay);
        }.bind(this),

        '(goodnight) (good night)': function() {
          var num;
          num = Math.floor((Math.random() * replies[2].text.length));
          toDisplay = replies[2].text[num];
          this.setState({
            toDisplay
          })
          console.log(this.state.toDisplay);
        }.bind(this),

        'who are you': function() {
          var num;
          num = Math.floor((Math.random() * replies[3].text.length));
          toDisplay = replies[3].text[num];
          this.setState({
            toDisplay
          })
          console.log(this.state.toDisplay);
        }.bind(this),

        'good morning': function() {
          var num;
          num = Math.floor((Math.random() * replies[4].text.length));
          toDisplay = replies[4].text[num];
          this.setState({
            toDisplay
          })
          console.log(this.state.toDisplay);
        }.bind(this),

        'good afternoon': function() {
          var num;
          num = Math.floor((Math.random() * replies[5].text.length));
          toDisplay = replies[5].text[num];
          this.setState({
            toDisplay
          })
          console.log(this.state.toDisplay);
        }.bind(this),
      }; 
      
      annyang.addCommands(commands);
      annyang.start();
    });
    

  }
  
  componentDidMount() {
    this.acceptVoiceCommands();
    this.defaultModules();
  }

  
  render() {
    const { top_bar, hero_section, middle_center, lower_section, bottom_bar } = this.state.surfaces;
    var { toDisplay } = this.state;
    return(
      <div>
        <div className="surface fullscreen below" />
        <SurfaceArea surfaceName="surface top bar" modules={top_bar} col_left={3} col_center={6} col_right={3}/>
        <SurfaceArea surfaceName="surface hero section" modules={hero_section} col_left={2} col_center={8} col_right={2}/>
        <SurfaceArea surfaceName="surface middle center" modules={middle_center} reply={toDisplay} col_left={2} col_center={8} col_right={2}/>
        <SurfaceArea surfaceName="surface lower section" modules={lower_section} col_left={1} col_center={10} col_right={1}/>
        <SurfaceArea surfaceName="surface bottom bar" modules={bottom_bar} col_left={1} col_center={10} col_right={1}/>
        <div className="surface fullscreen above"/>
      </div>
    );
  }
}
