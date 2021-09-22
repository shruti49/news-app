import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
	noOfArticles = 12;
	country = "us";
	apiKey = process.env.REACT_APP_NEWS_API;
	state = {
		progress: 0,
	};
	setProgress = (progress) => {
		this.setState({ progress });
	};

	render() {
		return (
			<Router>
				<div className="app">
					<LoadingBar height={3} color="#f11946" progress={this.state.progress} />
					<Navbar title="News Flash"/>
					<Switch>
						<Route exact path="/">
							<News
								apiKey={this.apiKey}
								setProgress={this.setProgress}
								key="general"
								noOfArticles={this.noOfArticles}
								country={this.country}
								category="general"
							/>
						</Route>
						<Route exact path="/business">
							<News
								apiKey={this.apiKey}
								setProgress={this.setProgress}
								key="business"
								noOfArticles={this.noOfArticles}
								country={this.country}
								category="business"
							/>
						</Route>
						<Route exact path="/science">
							<News
								apiKey={this.apiKey}
								setProgress={this.setProgress}
								key="science"
								noOfArticles={this.noOfArticles}
								country={this.country}
								category="science"
							/>
						</Route>
						<Route exact path="/entertainment">
							<News
								apiKey={this.apiKey}
								setProgress={this.setProgress}
								key="entertainment"
								noOfArticles={this.noOfArticles}
								country={this.country}
								category="entertainment"
							/>
						</Route>
						<Route exact path="/health">
							<News
								apiKey={this.apiKey}
								setProgress={this.setProgress}
								key="health"
								noOfArticles={this.noOfArticles}
								country={this.country}
								category="health"
							/>
						</Route>
					</Switch>
				</div>
			</Router>
		);
	}
}
