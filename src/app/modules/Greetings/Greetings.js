import React from 'react';

export class Greetings extends React.Component{
	
	constructor(props){
		super(props);
		this.state = { 
			greet: null,
		 };
	}

	componentDidMount(){
		
		this.greetID = setInterval(() => this.tick(),1500);
	}
	
	componentWillMount(){
		clearInterval(this.greetID);
	}
	
	greetChanger(){
		var hr  = new Date().getHours();
		var gr;
		if(hr >= 0 && hr < 12){
			gr="Good Morning.";
		}else if(hr >=12 && hr < 17){
			gr="Have a great afternoon.";
		} else { 
			gr = "Evening, Sir.";
		}
		return gr;
	}
	
	tick(){
		this.setState({
			greet: this.greetChanger()
		});
	}
	
	render(){
		const { greet } = this.state;

		if(this.props.reply == 'hello') {
			console.log(this.state.greet);
			return <center> <h2> {(this.state.greet === null)? <p>Loading.. .</p> : this.state.greet} </h2> </center> 
		} else {
			return(
				<div> 
					<center><h2>{this.props.reply}</h2></center>
					<center><p>{this.props.listening}</p></center>
				</div>
			); 
		}
	}
}