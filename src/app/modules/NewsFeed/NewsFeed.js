import React from 'react';
import $ from 'jquery';

export class NewsFeed extends React.Component{
	constructor(){
		super()
		this.state = {
			num : 0,
			news : [],
			header: ''
		}
	}

	componentWillMount(){
		$.ajax({
			url : "https://newsapi.org/v1/articles?source=financial-times&sortBy=latest&apiKey=177e6a1156d14f56b87bb61b665d3786",
			type : "GET",
			dataType : "json",
			ContentType : "application/json",
			success : function(data){
				var newsArray = data.articles;
				for(var i=0; i<newsArray.length; i++){
					this.state.news.push(newsArray[i].title);
				}
			}.bind(this),
			error : function(jqXHR){
				console.log(jqXHR);
			}.bind(this)
		})
		// console.log(this.state.news);
	}

	timer(){
		this.setState({
			num : Math.floor((Math.random() * this.state.news.length))
		})
	}

	componentDidMount(){
		this.now = setInterval(this.timer.bind(this),5000);
	}

	render(){
		if(this.state.news.length >= 1) {
			this.state.header = 'RECENT NEWS';
		} else {
			this.state.header = 'Loading.. .';
		}

		return(
			<div>	
				<h6>{this.state.header}</h6>
				<h5> {this.state.news[this.state.num]} </h5>
			</div>
		)
	}
}