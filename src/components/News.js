import React, { Component } from "react";
import NewsItem from "./NewsItem";

export default class News extends Component {
	constructor() {
		super();
		this.state = {
			articles: [],
			loading: false,
			pageNo: 1,
			pageSize: 10,
		};
	}

	fetchData = async (pageno) => {
		let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=29bcb89ef0cf4767a929c6b98dd1f7d6&page=${pageno}&pageSize=${this.state.pageSize}`;
		let data = await fetch(url);
		let parseData = await data.json();
		console.log(parseData);
		this.setState({
			articles: parseData.articles,
			totalResults: parseData.totalResults,
		});
	};

	handleNextClick = async (e) => {
		e.preventDefault();
		if (this.state.pageNo + 1 > Math.ceil(this.state.totalResults / this.state.pageSize)) {
		} else {
			this.setState({ pageNo: this.state.pageNo + 1 }, () => {
				this.fetchData(this.state.pageNo);
			});
		}
	};

	handlePrevClick = async (e) => {
		e.preventDefault();
		this.setState({ pageNo: this.state.pageNo - 1 }, () => {
			this.fetchData(this.state.pageNo);
		});
	};

	async componentDidMount() {
		this.fetchData(this.state.pageNo);
	}

	render() {
		return (
			<div className="container my-3 news__container">
				<h2 className="text-center">News Monkey - Top Headings</h2>
				<nav aria-label="Page navigation example">
					<ul className="pagination justify-content-end">
						<li className={`page-item ${this.state.pageNo <= 1?"disabled":""}`}>
							<a
								href="#"
								className="page-link"
								onClick={this.handlePrevClick}
							>
								Previous
							</a>
						</li>
						<li className={`page-item ${this.state.pageNo + 1 > Math.ceil(this.state.totalResults / this.state.pageSize)?"disabled":""}`}>
							<a href="#" className="page-link" onClick={this.handleNextClick}>
								Next
							</a>
						</li>
					</ul>
				</nav>

				<div className="row">
					{this.state.articles.map((article) => (
						<div className="col-md-4" key={article.url}>
							<NewsItem
								title={article.title}
								description={article.description}
								imageUrl={article.urlToImage}
								newsUrl={article.url}
							/>
						</div>
					))}
				</div>
			</div>
		);
	}
}
