import React from 'react';

export class EditableLabel extends React.Component {
    constructor(props) {
        super();
        this.state = {
            editing: false,
            text: '',
        }

        this.labelClicked = this.labelClicked.bind(this);
        this.textChanged = this.textChanged.bind(this);
        this.inputLostFocus = this.inputLostFocus.bind(this);
        this.keyPressed = this.keyPressed.bind(this);
    }

    labelClicked() {
        this.setState({
            editing: true
        })
    }

    textChanged() {
        this.setState({
            text: this.refs.textInput.value
        })
    }

    inputLostFocus() {
        this.setState({
            editing: false
        })
    }
    
    keyPressed(event) {
        if(event.key == 'Enter') {
            this.inputLostFocus();
        }
    }

    componentDidMount() {
        this.labelClicked;
        this.textChanged;
        this.inputLostFocus;
        this.keyPressed;
    }

    componentWillMount() {
        this.setState({
            text: this.props.text
        })
    }

  render() {
      var { text } = this.state;
  	if(this.state.editing)
    	return <input 
      	ref='textInput'
        type='text'
        onChange={this.textChanged}
        onBlur={this.inputLostFocus}
        onKeyPress={this.keyPressed}
        value={this.state.text}
        autoFocus
     	/>;

		return <div onClick={this.labelClicked} >{text}</div>;
  }
}