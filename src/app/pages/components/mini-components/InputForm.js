import React from 'react';

export class InputForm extends React.Component {
    
    render() {
        var { label, type, ref, material_icon, size } = this.props;
        return(
            <div>
                <div className="row">
                    <div className={'input-field col s'+ size}>
                        <i className="material-icons prefix">{ material_icon }</i>
                        <input id="icon_prefix" ref={ ref } type={ type } className="validate" />
                        <label for="icon_prefix">{ label }</label>
                    </div>
                </div>
            </div>
        );
    }
}