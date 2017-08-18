import React from 'react';
import { Module } from './Module';

export class SurfaceArea extends React.Component {
  constructor() {
    super();
    this.state = {
      positions: {
        left: [],
        center: [],
        right: []
      }
    }
  }

  componentWillMount() {
    // pushing modules into their positions
    if(this.props.modules.length !== 0) {
      this.props.modules.map((module, position) => {
        if(module.position !== null && ["left", "center", "right"].indexOf(module.position) !== -1){
          this.state.positions[module.position].push(module);
          // console.log(this.state.positions[module.position]);
        } else {
          // console.log("Error: Position is not defined for " + module.name + ".");
        }
        return module;
      });
    } else {
      // console.log("Surface area empty.");
    }
  }

  render() {
    // console.log(this.state.positions.left);
    return(
      <div className={this.props.surfaceName}>
        <div className="container">
          <div className="row text-center">
            <div className={'col-sm-' + this.props.col_left}>
              <Module modules={this.state.positions.left} />       
            </div>
            <div className={'col-sm-' + this.props.col_center}>
              <Module modules={this.state.positions.center} />                     
            </div>
            <div className={'col-sm-' + this.props.col_right}>
              <Module modules={this.state.positions.right} />              
            </div>
          </div>
        </div>
      </div>
    );
  }
}
