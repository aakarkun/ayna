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
			gr = "Evening. Rest well Sir.";
		}
		return gr;
	}
	
	tick(){
		this.setState({
			greet: this.greetChanger()
		});
	}

	// flush() {
	// 	setTimeout(() => {
	// 		this.setState({
	// 			reply: ''
	// 		})
	// 	}, 500);
	// }
	
	render(){
		const { greet } = this.state;

		if(this.props.reply == 'hello') {
			console.log(this.state.greet);
			return <h2> <center> {this.state.greet} </center> </h2> 
		} else {
			return(
				<div> 
					<h2><center>{this.props.reply}</center></h2>
					<h2><center>👻</center></h2> 
				</div>
			); 
		}
	}
}