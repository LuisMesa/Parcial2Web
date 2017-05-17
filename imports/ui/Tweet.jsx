import React, {Component} from "react";
import { Meteor } from "meteor/meteor";



export default class Tweet extends Component {
  render() {
    return (<div className="col-md-12 row tweet">
      <div className="col-md-2 tweet-img">
        <img src={this.props.tweet.user.profile_image_url} alt={this.props.tweet.user.screen_name + "profile image"}/>
      </div>
      <div className="col-md-7 row">
      <div className="col-md-12 tweet-name">
        <p>{this.props.tweet.user.name}</p>
      </div>
        <div className="col-md-12 tweet-screen_name">
          <p>@{this.props.tweet.user.screen_name}</p>
        </div>
      </div>
      <div className="col-md-3 tweet-date">
        <span className="day">{this.props.tweet.created_at.split(" ")[2]} -</span>
        <span className="month"> {this.props.tweet.created_at.split(" ")[1]} </span>
        <p className="hour">{this.props.tweet.created_at.split(" ")[3]} </p>
      </div>
      <div className="col-md-12 tweet-text">
        <p>{this.props.tweet.text} </p>
      </div>

      {/*<span>{JSON.stringify(this.props.tweet)}</span>*/}
    </div>);
  }
}