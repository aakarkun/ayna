import React from 'react';

import { SurfaceArea } from './SurfaceArea';

export class MainSurface extends React.Component {
  constructor() {
    super();
    this.state = {
      modules: getModules(),
      surfaces : {
        top_bar: [],
        hero_section: [],
        middle_center: [],
        lower_section: [],
        bottom_bar: []
      }
    };

    function getModules() {
      var modules = [
        {
          "id": "01",
          "name": "AnalogClock",
          "surface_area": "top_bar",
          "position": "left",
          "header": "Analog Clock",
          "category": "Date & Time",
          "visible": "true"
        },
        {
          "id": "02",
          "name": "NewsFeed",
          "surface_area": "bottom_bar",
          "position": "center",
          "header": "News Feed",
          "category": "News",
          "visible": "true"
        },
        {
          "id": "04",
          "name": "Greetings",
          "surface_area": "lower_section",
          "position": "center",
          "header": "Greeting",
          "category": "Greets",
          "visible": "true"
        },
        {
          "id": "06",
          "name": "Quotes",
          "surface_area": "bottom_bar",
          "position": "right",
          "header": "Quotes",
          "category": "Quotes",
          "visible": "true"
        },
        {
          "id": "07",
          "name": "Weather",
          "surface_area": "top_bar",
          "position": "right",
          "header": "Weather",
          "category": "Weather",
          "visible": "true"
        }
      ];
      
    return modules;
    }
  }

  componentWillMount() {
    // defining the valid surfaces
    var validSurfaces = ["top_bar", "hero_section", "middle_center", "lower_section", "bottom_bar"];

    // pushing the appropriate modules in corresponding surface areas
    if(this.state.modules.length !== 0) {
      this.state.modules.map((module, id) => {
        if(module.surface_area !== null && validSurfaces.indexOf(module.surface_area) !== -1){
          this.state.surfaces[module.surface_area].push(module);
        } else {
          console.log("Error: Surface area is not defined for " + module.name + ".");
        }
        return module;
      });
    } else {
      console.log("Error: No modules found!");
    }
  };

  render() {
    return(
      <div>
        <div className="surface fullscreen below" />
        <SurfaceArea surfaceName="surface top bar" modules={this.state.surfaces.top_bar} col_left={3} col_center={6} col_right={3}/>
        <SurfaceArea surfaceName="surface hero section" modules={this.state.surfaces.hero_section} col_left={2} col_center={8} col_right={2}/>
        <SurfaceArea surfaceName="surface middle center" modules={this.state.surfaces.middle_center} col_left={3} col_center={6} col_right={3}/>
        <SurfaceArea surfaceName="surface lower section" modules={this.state.surfaces.lower_section} col_left={2} col_center={8} col_right={2}/>
        <SurfaceArea surfaceName="surface bottom bar" modules={this.state.surfaces.bottom_bar} col_left={2} col_center={8} col_right={2}/>
        <div className="surface fullscreen above"/>
      </div>
    );
  }
}
