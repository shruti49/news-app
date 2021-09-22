import React, { Component } from "react";
import Spinner from "./Spinner";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
	static defaultProps = {
		noOfArticles: 14,
		country: "in",
		category: "general",
	};

	static propTypes = {
		noOfArticles: PropTypes.number,
		country: PropTypes.string,
		category: PropTypes.string,
	};

	capitalizeText = (text) => {
		let text1 = text.toLowerCase();
		var arr = [];
		arr.push(text1[0].toUpperCase());
		for (var j = 1; j < text1.length; j++) {
			if (text1[j - 1] === " " || text1[j - 1] === "\n") {
				arr.push(text1[j].toUpperCase());
			} else {
				arr.push(text1[j]);
			}
		}

		return arr.toString().replaceAll(",", "");
	};

	constructor(props) {
		super(props);
		this.state = {
			articles: [],
			loading: true,
			pageNo: 1,
			totalResults: 0,
		};
		document.title = `NewsMonkey - ${this.capitalizeText(this.props.category)}`;
	}

	fetchData = async () => {
		this.props.setProgress(10);
		let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.pageNo}&pageSize=${this.props.noOfArticles}`;
		this.setState({ loading: true });
		this.props.setProgress(30);
		let data = await fetch(url);
		let parseData = await data.json();
		this.props.setProgress(70);
		this.setState({
			loading: false,
			articles: parseData.articles,
			totalResults: parseData.totalResults,
		});
		this.props.setProgress(100);
	};

	async componentDidMount() {
		this.fetchData();
	}

	handleNextClick = async (e) => {
		this.setState({ pageNo: this.state.pageNo + 1 });
		this.fetchData();
	};

	handlePrevClick = async (e) => {
		this.setState({ pageNo: this.state.pageNo - 1 });
		this.fetchData();
	};

	fetchMoreData = async () => {
		this.setState({ pageNo: this.state.pageNo + 1 });
		let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=29bcb89ef0cf4767a929c6b98dd1f7d6&page=${this.state.pageNo}&pageSize=${this.props.noOfArticles}`;
		let data = await fetch(url);
		let parseData = await data.json();
		this.setState({
			articles: this.state.articles.concat(parseData.articles),
			totalResults: parseData.totalResults
		});	
	};

	render() {
		return (
			<>
				<h2 className="text-center my-3">
					News Monkey - Top Headings {`(${this.capitalizeText(this.props.category)})`}
				</h2>
				{this.state.loading && <Spinner />}

				<InfiniteScroll
					dataLength={this.state.articles.length}
					next={this.fetchMoreData}
					hasMore={this.state.articles.length !== this.state.totalResults}
					loader={<Spinner />}
					style={{overflow:"hidden"}}
				>
					<div className="container">
						<div className="row">
							{this.state.articles.map((article) => (
								<div className="col-md-4" key={article.url}>
									<NewsItem
										title={article.title}
										description={article.description}
										imageUrl={article.urlToImage}
										newsUrl={article.url}
										author={article.author}
										date={article.publishedAt}
									/>
								</div>
							))}
						</div>
					</div>
				</InfiniteScroll>
				{/* <div className="d-flex justify-content-between">
					<button
						type="button"
						className="btn btn-dark"
						disabled={this.state.pageNo <= 1}
						onClick={this.handlePrevClick}
					>
						Previous
					</button>
					<button
						type="button"
						className="btn btn-dark"
						disabled={
							this.state.pageNo + 1 > Math.ceil(this.state.totalResults / this.props.noOfArticles)
						}
						onClick={this.handleNextClick}
					>
						Next
					</button>
					</div>*/}
			</>
		);
	}
}
