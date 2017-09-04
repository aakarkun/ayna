import React from 'react';

import { SurfaceArea } from './SurfaceArea';
import { isLoggedIn } from '../utils/AuthService';
import { getDefaultModules, getModules, changePosition, setVisible } from '../utils/modules-api';
import { Spinner } from '../pages/components/mini-components/Spinner';
import { getUsername, deleteUserModule } from '../utils/users-api';
import { browserHistory } from 'react-router';



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
      userStatus: isLoggedIn(),
      replies: [
        {
          command: "hello",
          text: [
            "Hello. How's it going?",
            "Hey, there",
            "Hello there",
            "Hi. Whats up!",
            "Hi.",
            "Hi. I'm Empresa",
            "Hello to you too",
            "Is it me you're looking for?",
            "Hello, Can I get something started for you?",
            "Yes, how can I help?",
          ]
        },
        {
          command: "how are you",
          text: [
            "Living the AI dream.",
            "I'm doing well. What about you?",
            "hmm. I'm fine I guess",
            "I'm feeling electrified.",
            "I'm well.",
            "I'm good. Feeling positively charged!"
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
        },
        {
          command: "update module",
          text: [
            "Please, Login first!",
            "You can't, without login!",
            "Sorry! I can't do this without knowing you. Please Login!"
          ]
        },
        {
          command: "do you know me",
          iDontKnowText: [
            "Please, Login first!",
            "I can't recognize you. Do login first!",
            "Sorry! I don't know you. Please Login!"
          ],
          iKnowYouText: [
            "Yes, you are my friend ",
            "I know you. You're my friend ",
            "Is that you, ",
            "That is easy, you are my friend "
          ]
        },
        {
          command: "remove module",
          cannotFindText: [
            "I can't find this module",
            "Opps! I find visible property of this module is already false!",
            "Sorry, I cannot remove the module which has been removed already!"
          ],
          findText: [
            "Module has been removed!",
            "Module is now invisible.",
            "abra kaa! dabra!",
            "aye aye! removing.. ."
          ],
          cannotRecognizeText: [
            "I cannot recognize this module.",
            "Do I know about this module?",            
            "You didn't told me about this module, did you?",
            "Is there any module with this name?",
            "This module is completely new to me."
          ]
        },
        {
          command: "show module",
          cannotFindText: [
            "I can't show this module twice!",
            "Opps! I find visible property of this module is already true!",
            "Sorry, this module is already in the screen!"
          ],
          findText: [
            "Module is now in the screen",
            "I'm glad that you make it visible"
          ],
          cannotRecognizeText: [
            "I cannot recognize this module.",
            "Do I know about this module?",
            "You didn't told me about this module, did you?",
            "Is there any module with this name?",
            "This module is completely new to me.",
            "Did you just add new module that I can't recognized?"
          ]
        },
        {
          command: "go to path",
          iDontKnowText: [
            "Please enter valid username and password."
          ]
        }
      ],
      toDisplay: 'hello',
      soundStarted: '',
      commandChannel: ''
    };

    this.acceptVoiceCommands = this.acceptVoiceCommands.bind(this);
  }

  fetchModules() {
    // defining the valid surfaces
    var validSurfaces = ["top_bar", "hero_section", "middle_center", "lower_section", "bottom_bar"];
    var surfaces = {
      top_bar: [],
      hero_section: [],
      middle_center: [],
      lower_section: [],
      bottom_bar: []
    };
    getModules().then((modules) => {
      // pushing the appropriate modules in corresponding surface areas
      if(modules.length !== 0) {
        modules.map((module, id) => {
          if(module.surface_area !== null && validSurfaces.indexOf(module.surface_area) !== -1 && module.visible !== false){
            surfaces[module.surface_area].push(module);
          } else if(module.visible === false){
            console.log(module.name + ' is hidden (try show ' + module.name +')');
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

    /* need to impliment this code
    // Add the commands to annyang
  			annyang.addCommands(commands);
			
			// Add callback functions for errors
			annyang.addCallback('error', function() {
				Log.error('ERROR in module ' + self.name + ': ' + 'Speech Recognition fails because an undefined error occured');
			});
			annyang.addCallback('errorNetwork', function() {
		    		Log.error('ERROR in module ' + self.name + ': ' + 'Speech Recognition fails because of a network error');
			});
			annyang.addCallback('errorPermissionBlocked', function() {
		    		Log.error('ERROR in module ' + self.name + ': ' + 'Browser blocks the permission request to use Speech Recognition');
			});
			annyang.addCallback('errorPermissionDenied', function() {
		    		Log.error('ERROR in module ' + self.name + ': ' + 'The user blocks the permission request to use Speech Recognition');
			});
			annyang.addCallback('resultNoMatch', function(phrases) {
				Log.error('ERROR in module ' + self.name + ': ' + 'No match for voice command ' + phrases);
			});
			annyang.addCallback('soundstart', function() {
				self.textMessage = self.translate("HEAR_YOU");
  				self.updateDom(self.config.animationSpeed);
			});
			annyang.addCallback('result', function() {
				self.textMessage = "";
  				self.updateDom(self.config.animationSpeed);
			});

			// Start listening
			annyang.start();
		} else {
			Log.error('ERROR in module ' + self.name + ': ' + 'Google Speech Recognizer is down :(');
		}

    */

    var availableModules = [];
    var newsChannels = ["sports", "bbc", "business", "google-news", "hacker-news"];
    var { replies, userStatus } = this.state;

    var toDisplay = '';

    if(annyang) {

      annyang.debug();
  
      annyang.addCallback('error', function(err) {
        console.log('There was an error in Annyang!',err);
      }.bind(this));
  
      annyang.addCallback('errorNetwork', function() {
        toDisplay = "Sorry, I and internet aren't talking right now. Please try again in a few."
        this.setState({
          toDisplay
        });
        console.log('ERROR: ' + 'Speech Recognition fails because of a network error');      
      }.bind(this));
      annyang.addCallback('errorPermissionBlocked', function() {
        console.log('ERROR: ' + 'Browser blocks the permission request to use Speech Recognition');      
        
      });
      annyang.addCallback('errorPermissionDenied', function() {
        console.log('ERROR: ' + 'The user blocks the permission request to use Speech Recognition');      
        
      });
  
      annyang.setLanguage('en-IN');
      getModules().then((modules) => {
  
        availableModules = modules;
        var availableModulesName = [];
        var visibleModules = [];
        var visibleModulesName = [];
        var invisibleModules = [];
        var invisibleModulesName = [];

        modules.map((module) => {
          availableModulesName.push(module.name.toLowerCase());
        });

        modules.map((module) => {
          if(module.visible === true) {
            visibleModules.push(module);
            visibleModulesName.push(module.name.toLowerCase());
          }
          if(module.visible === false) {
            invisibleModules.push(module);
            invisibleModulesName.push(module.name.toLowerCase());
          }
        })
        console.log(visibleModulesName);
        var commands = {  
          'reload': function() {
            window.location.reload();
          },

          'position (that) :moduleName (to) (the) :newPosition': function(moduleName, newPosition) {
            // console.log(availableModules);
            if(!userStatus) {
              var num;
              num = Math.floor((Math.random() * replies[6].text.length));
              toDisplay = replies[6].text[num];
              this.setState({
                toDisplay
              })
            } else {
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
                    console.log("Modules Matched! previously " + aModule.name.toLowerCase() + " was in " + aModule.position);
                    aModule.position = newPosition;
                    console.log("now " + aModule.name + " is in " + aModule.position);
                    changePosition(aModule._id, newPosition).then(data => {
                      console.log(data);
                      window.location.reload();
                    })
                  }
                });
              } else {
                toDisplay = "Position not matched!";
                this.setState({
                  toDisplay
                })
              }
            }
  
          }.bind(this),
    
          '(hello) (hi) (hey) (howdy) (whats up) (yo)': function() {
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
  
          'do you know (me)': function() {
            if(!userStatus) {
              var num;
              num = Math.floor((Math.random() * replies[7].iDontKnowText.length));
              toDisplay = replies[7].iDontKnowText[num];
              this.setState({
                toDisplay
              })
            } else {
              getUsername().then((username) => {   
                console.log("online: " + userStatus);   
                var num;
                num = Math.floor((Math.random() * replies[7].iKnowYouText.length));        
                toDisplay = replies[7].iKnowYouText[num] + username.charAt(0).toUpperCase() + username.slice(1);
                this.setState({
                  toDisplay
                })
              })
            }
  
          }.bind(this),
  
          'remove :moduleName :moduleSurname': function(moduleName, moduleSurname) {
            if(!userStatus) {
              var num;
              num = Math.floor((Math.random() * replies[6].text.length));
              toDisplay = replies[6].text[num];
              this.setState({
                toDisplay
              })
            } else {
                if(moduleName === 'digital' && moduleSurname === 'clock') {
                  moduleName = moduleName+moduleSurname;
                } else if(moduleName === 'news' && moduleSurname === 'feed') {
                  moduleName = moduleName+moduleSurname;                    
                }
                console.log(moduleName);
                  if(visibleModulesName.indexOf(moduleName) === -1 && invisibleModulesName.indexOf(moduleName) !== -1) {
                    console.log(visibleModulesName.indexOf(moduleName));
                    num = Math.floor((Math.random() * replies[8].cannotFindText.length));
                    toDisplay = replies[8].cannotFindText[num];
                    console.log(toDisplay);
                    this.setState({
                      toDisplay
                    });
                  }

                  if(availableModulesName.indexOf(moduleName) === -1) {
                    num = Math.floor((Math.random() * replies[8].cannotRecognizeText.length));
                    toDisplay = replies[8].cannotRecognizeText[num];
                    console.log(toDisplay);
                    this.setState({
                      toDisplay
                    });
                  }

                  visibleModules.map((vModule, index) => {
                    if(vModule.name.toLowerCase() === moduleName) {
                      setVisible(vModule._id, false).then((response, error) => {
                        if(response) {
                            window.location.reload();
                            num = Math.floor((Math.random() * replies[8].findText.length));
                            toDisplay = replies[8].findText[num];
                            console.log(toDisplay);
                            this.setState({
                              toDisplay
                            });
                        } else {
                            console.log("Error: " + error);
                        }
                      });
                    }
                  });
              }
          }.bind(this),

          'show :moduleName :moduleSurname': function(moduleName, moduleSurname) {
            if(!userStatus) {
              var num;
              num = Math.floor((Math.random() * replies[6].text.length));
              toDisplay = replies[6].text[num];
              this.setState({
                toDisplay
              })
            } else {
                if(moduleName === 'digital' && moduleSurname === 'clock') {
                  moduleName = moduleName+moduleSurname;
                } else if(moduleName === 'news' && moduleSurname === 'feed') {
                  moduleName = moduleName+moduleSurname;                    
                }
                if(invisibleModulesName.indexOf(moduleName) === -1 && visibleModulesName.indexOf(moduleName) !== -1) {
                  num = Math.floor((Math.random() * replies[9].cannotFindText.length));
                  toDisplay = replies[9].cannotFindText[num];
                  this.setState({
                    toDisplay
                  })
                }

                if(availableModulesName.indexOf(moduleName) === -1) {
                  num = Math.floor((Math.random() * replies[9].cannotRecognizeText.length));
                  toDisplay = replies[9].cannotRecognizeText[num];
                  console.log(toDisplay);
                  this.setState({
                    toDisplay
                  });
                }

                invisibleModules.map((ivModule, index) => {
                  if(ivModule.name.toLowerCase() === moduleName) {
                    setVisible(ivModule._id, true).then((response, error) => {
                      if(response) {
                          window.location.reload();
                          num = Math.floor((Math.random() * replies[9].findText.length));
                          toDisplay = replies[9].findText[num];
                          console.log(toDisplay);
                          this.setState({
                            toDisplay
                          });
                      } else {
                          console.log("Error: " + error);
                      }
                    })
                  }
                })
            }
          }.bind(this),

          'remove :moduleName': function(moduleName, moduleSurname) {
            if(!userStatus) {
              var num;
              num = Math.floor((Math.random() * replies[6].text.length));
              toDisplay = replies[6].text[num];
              this.setState({
                toDisplay
              })
            } else {
              if(moduleName === 'clock' | moduleName === 'watch') {
                moduleName = 'analogclock'
              }
              if(moduleName === 'digital' && moduleSurname === 'clock') {
                moduleName = moduleName+moduleSurname;
                console.log(moduleName);
              }
              if(moduleName === 'news' | moduleName === 'feed') {
                moduleName = 'newsfeed'
              }
              if(moduleName === 'codes') {
                moduleName = 'quotes'
              }
              console.log(moduleName);

              if(visibleModulesName.indexOf(moduleName) === -1 && invisibleModulesName.indexOf(moduleName) !== -1) {
                console.log(visibleModulesName.indexOf(moduleName));
                num = Math.floor((Math.random() * replies[8].cannotFindText.length));
                toDisplay = replies[8].cannotFindText[num];
                console.log(toDisplay);
                this.setState({
                  toDisplay
                });
              }

              if(availableModulesName.indexOf(moduleName) === -1) {
                num = Math.floor((Math.random() * replies[8].cannotRecognizeText.length));
                toDisplay = replies[8].cannotRecognizeText[num];
                console.log(toDisplay);
                this.setState({
                  toDisplay
                });
              }

              visibleModules.map((vModule, index) => {
                if(vModule.name.toLowerCase() === moduleName) {
                  setVisible(vModule._id, false).then((response, error) => {
                    if(response) {
                        window.location.reload();
                        num = Math.floor((Math.random() * replies[8].findText.length));
                        toDisplay = replies[8].findText[num];
                        console.log(toDisplay);
                        this.setState({
                          toDisplay
                        });
                    } else {
                        console.log("Error: " + error);
                    }
                  });
                }
              });

            }
          }.bind(this),
  
          'show :moduleName': function(moduleName) {
            if(!userStatus) {
              var num;
              num = Math.floor((Math.random() * replies[6].text.length));
              toDisplay = replies[6].text[num];
              this.setState({
                toDisplay
              })
            } else {
                if(moduleName === 'clock' | moduleName === 'watch') {
                  moduleName = 'analogclock'
                }
                if(moduleName === 'news' | moduleName === 'feed') {
                  moduleName = 'newsfeed'
                }
                if(moduleName === 'codes') {
                  moduleName = 'quotes'
                }

                if(invisibleModulesName.indexOf(moduleName) === -1 && visibleModulesName.indexOf(moduleName) !== -1) {
                  num = Math.floor((Math.random() * replies[9].cannotFindText.length));
                  toDisplay = replies[9].cannotFindText[num];
                  this.setState({
                    toDisplay
                  })
                }

                if(availableModulesName.indexOf(moduleName) === -1) {
                  num = Math.floor((Math.random() * replies[9].cannotRecognizeText.length));
                  toDisplay = replies[9].cannotRecognizeText[num];
                  console.log(toDisplay);
                  this.setState({
                    toDisplay
                  });
                }

                invisibleModules.map((ivModule, index) => {
                  if(ivModule.name.toLowerCase() === moduleName) {
                    setVisible(ivModule._id, true).then((response, error) => {
                      if(response) {
                          window.location.reload();
                          num = Math.floor((Math.random() * replies[9].findText.length));
                          toDisplay = replies[9].findText[num];
                          console.log(toDisplay);
                          this.setState({
                            toDisplay
                          });
                      } else {
                          console.log("Error: " + error);
                      }
                    })
                  }
                })
            }
          }.bind(this),
  
          'go (to) :path (page)': function(path) {
            if(!userStatus) {
              
              var num;
              num = Math.floor((Math.random() * replies[7].iDontKnowText.length));
              toDisplay = replies[7].iDontKnowText[num];
              this.setState({
                toDisplay
              })
              browserHistory.push("/dashboard");
            } else {
              if(path === "profile") {
                toDisplay = "profile";
                this.setState({
                  toDisplay
                })
                browserHistory.push("/profile");
              } else if(path === "modules" | path === "module") {
                toDisplay = "modules";
                this.setState({
                  toDisplay
                })
                browserHistory.push("/modules");
              } else if(path === "dashboard") {
                getUsername().then((username) => {   
                  var num;
                  toDisplay = "Welcome to Dashboard " + username.charAt(0).toUpperCase() + username.slice(1);
                  this.setState({
                    toDisplay
                  })
                  browserHistory.push("/dashboard");
                });
              } else {
                toDisplay = "Sorry! I can't find where to go.";
                this.setState({
                  toDisplay
                })
              }
            }

          }.bind(this)
        }; 
        
        annyang.addCommands(commands);
        annyang.start({ autoRestart: true });      
        // annyang.start({ autoRestart: true });
        console.log("Listening.. .");
  
      });
    }
  }

  componentDidMount() {
    this.acceptVoiceCommands();
    this.fetchModules();
  }

  
  render() {
    const { modules } = this.state;
    const { top_bar, hero_section, middle_center, lower_section, bottom_bar } = this.state.surfaces;
    var { toDisplay, soundStarted, commandChannel } = this.state;
    return(
      <div>
      {(modules.length === 0) ? <Spinner /> : 
        <div>
          <div className="surface fullscreen below" />
          <SurfaceArea surfaceName="surface top bar" modules={top_bar} col_left={3} col_center={6} col_right={3}/>
          <SurfaceArea surfaceName="surface hero section" modules={hero_section} col_left={2} col_center={8} col_right={2}/>
          <SurfaceArea surfaceName="surface middle center" modules={middle_center} reply={toDisplay} col_left={1} col_center={10} col_right={1}/>
          <SurfaceArea surfaceName="surface lower section" modules={lower_section} col_left={1} col_center={10} col_right={1}/>
          <SurfaceArea surfaceName="surface bottom bar" modules={bottom_bar} col_left={1} col_center={10} col_right={1}/>
          <div className="surface fullscreen above"/>
        </div>
      }
      {/* {console.log(modules)} */}
      </div>
    );
  }
}
