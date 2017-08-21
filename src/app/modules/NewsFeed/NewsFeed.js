import React from 'react';
import $ from 'jquery';

export class NewsFeed extends React.Component{
	constructor(){
		super()
		this.state = {
			newsLength : 0,
			news : [],
			imageUrl: [],
			author: [],
			heading: '',
			channelNumber: 0,
			channel: [
				{
					"name": "sports",
					"url": "https://newsapi.org/v1/articles?source=espn&sortBy=top&apiKey=8586564b8e2244dfae516ae14c3ff07e",
					"powered_by": "ESPN"
				},
				{
					"name": "business",
					"url": "https://newsapi.org/v1/articles?source=business-insider&sortBy=top&apiKey=8586564b8e2244dfae516ae14c3ff07e",
					"powered_by": "Business Insider"
				},
				{
					"name": "bbc",
					"url": "https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=8586564b8e2244dfae516ae14c3ff07e",
					"powered_by": "BBC"					
				},
				{
					"name": "google-news",
					"url": " https://newsapi.org/v1/articles?source=google-news&sortBy=top&apiKey=8586564b8e2244dfae516ae14c3ff07e",
					"powered_by": "Google News"
				},
				{
					"name": "hacker-news",
					"url": "https://newsapi.org/v1/articles?source=hacker-news&sortBy=top&apiKey=8586564b8e2244dfae516ae14c3ff07e",
					"powered_by": "Hacker News"
				}
			]
		}
	}

	componentWillMount(){
		var channelNumber = Math.floor((Math.random() * this.state.channel.length));
		this.setState({
			channelNumber
		})
		$.ajax({
			url : this.state.channel[channelNumber].url,
			type : "GET",
			dataType : "json",
			ContentType : "application/json",
			success : function(data){
				var newsArray = data.articles;
				for(var i=0; i<newsArray.length; i++){
					this.state.news.push(newsArray[i].title);
					this.state.author.push(newsArray[i].author);					
					this.state.imageUrl.push(newsArray[i].urlToImage);
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
			newsLength : Math.floor((Math.random() * this.state.news.length))
		})
	}

	componentDidMount(){
		this.now = setInterval(this.timer.bind(this),7000);
	}

	render(){
		if(this.state.news.length >= 1) {
			this.state.heading = 'RECENT NEWS';
		} else {
			this.state.heading = 'Loading.. .';
		}

		return(
			<div className="text-left">
				<div className="col-sm-3 text-right">
					{/* {console.log(this.state.imageUrl[this.state.newsLength])} */}
					{(this.state.imageUrl[this.state.newsLength] !== null)? 
						<img className="news-img" src={this.state.imageUrl[this.state.newsLength]} /> : 
						<img className="news-img" src="https://image.ibb.co/i98W2Q/no_image.jpg" alt="no_image" border="0" />
						}
					
				</div>
				<div className="col-sm-9">
					<h6>{this.state.heading}</h6>
					<h6> {this.state.news[this.state.newsLength]} </h6>
					<p className="news-via"> {this.state.author[this.state.newsLength]} | via {this.state.channel[this.state.channelNumber].powered_by} </p>
					{/* <p className="news-via"> via {this.state.channel[this.state.channelNumber].powered_by} </p> */}
				</div>
			</div>
		)
	}
}