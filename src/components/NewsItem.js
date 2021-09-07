import React, { Component } from "react";

export default class NewsItem extends Component {
	render() {
		let { title, description,imageUrl,newsUrl} = this.props;
		return (
			<div className="my-3 newsItem__container">
				<div className="card" style={{ width: "18rem" }}>
					<img src={imageUrl?imageUrl:""} className="card-img-top" alt="news" />
					<div className="card-body">
						<h5 className="card-title">{title?title.slice(0,40) + "...":title}</h5>
						<p className="card-text">{description?description.slice(0,80) + "...":description}</p>
						<a href={newsUrl} className="btn btn-sm btn-dark">
							Read More
						</a>
					</div>
				</div>
			</div>
		);
	}
}
