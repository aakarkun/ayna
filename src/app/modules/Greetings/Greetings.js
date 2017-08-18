import React from 'react';

export class Greetings extends React.Component{
	
	constructor(props){
		super(props);
		this.state = { greet: null };
	}

	componentDidMount(){
		this.greetID = setInterval(() => this.tick(),500);
	}
	
	componentWillMount(){
		clearInterval(this.greetID);
	}

	greetChanger(){
		var hr  = new Date().getHours();
		var gr;
		if(hr >= 0 && hr < 12){
			gr="Good Morning!";
		}else if(hr >=12 && hr < 17){
			gr="Have a great afternoon.";
		} else { 
			gr = "Evening. Rest well Sir.";
		}
		return gr;
	}

	tick(){
		this.setState({
			greet: this.greetChanger()
		});
	}

	render(){
		return <div> <h1> <center> {this.state.greet} </center> </h1> </div>;
	}
}