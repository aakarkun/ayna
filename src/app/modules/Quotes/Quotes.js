import React from 'react';

var quotes = [
"Whatever the mind of man can conceive and believe, it can achieve.",
"Two roads diverged in a wood, and I—I took the one less traveled by, And that has made all the difference.",
"Strive not to be a success, but rather to be of value.",
"The most difficult thing is the decision to act, the rest is merely tenacity.",
"Life is what happens to you while you’re busy making other plans.",
"Twenty years from now you will be more disappointed by the things that you didn’t do than by the ones you did do.",
"Explore, Dream, Discover.",
"The most common way people give up their power is by thinking they don’t have any."
];

export class Quotes extends React.Component{
	constructor(props){
		super(props);
		this.state = {num : 0}
	}


	timer(){
		this.setState({
			num : Math.floor((Math.random() * quotes.length))
		})
	}
	componentDidMount(){
		this.now = setInterval(this.timer.bind(this),10000);
	}
	render() { 
		//const listItem = list.map((item) => <li> {item}</li>);
		return(
			<div className="text-center">
				<h6 style={{fontWeight: "400"}}>QUOTES</h6>
				<h5 style={{fontWeight: "300", fontSize: "18px"}}> {quotes[this.state.num]} </h5>
			</div>
		);
	}
}