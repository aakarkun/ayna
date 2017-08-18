import React from 'react';

import { SurfaceArea } from './SurfaceArea';
import { getModulesData } from '../utils/modules-api';

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
      }
    };
  }

  getDefaultModules() {

    getModulesData().then((modules) => {
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

  
  componentDidMount() {
    this.getDefaultModules();
  }

  render() {
    const { top_bar, hero_section, middle_center, lower_section, bottom_bar } = this.state.surfaces;
    return(
      <div>
        <div className="surface fullscreen below" />
        <SurfaceArea surfaceName="surface top bar" modules={top_bar} col_left={3} col_center={6} col_right={3}/>
        <SurfaceArea surfaceName="surface hero section" modules={hero_section} col_left={2} col_center={8} col_right={2}/>
        <SurfaceArea surfaceName="surface middle center" modules={middle_center} col_left={3} col_center={6} col_right={3}/>
        <SurfaceArea surfaceName="surface lower section" modules={lower_section} col_left={2} col_center={8} col_right={2}/>
        <SurfaceArea surfaceName="surface bottom bar" modules={bottom_bar} col_left={2} col_center={8} col_right={2}/>
        <div className="surface fullscreen above"/>
      </div>
    );
  }
}
