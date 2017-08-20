import React from 'react';
import { Module } from './Module';

export class SurfaceArea extends React.Component {
  
  render() {
    var positions = {
          left: [],
          center: [],
          right: []
        };

    if(this.props.modules.length !== 0) {
      this.props.modules.map((module, position) => {
        if(module.position !== null && ["left", "center", "right"].indexOf(module.position) !== -1){
          positions[module.position].push(module);
          // console.log(this.state.positions[module.position]);
        } else {
          // console.log("Error: Position is not defined for " + module.name + ".");
        }
        return module;
      });
    } else {
      // console.log("Surface area empty.");
    }

    return(
      <div className={this.props.surfaceName}>
        {/* {console.log(this.props.reply)} */}
        <div className="container">
          <div className="row text-center">
            <div className={'col-sm-' + this.props.col_left}>
              <Module modules={positions.left} reply={this.props.reply}/>       
            </div>
            <div className={'col-sm-' + this.props.col_center}>
              <Module modules={positions.center} reply={this.props.reply}/>                 
            </div>
            <div className={'col-sm-' + this.props.col_right}>
              <Module modules={positions.right} reply={this.props.reply}/>              
            </div>
          </div>
        </div>
      </div>
    );
  }
}
