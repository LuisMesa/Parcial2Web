import React, {Component} from "react";
import Tweet from "./Tweet.jsx";

export default class TweetsList extends Component {
  renderTweets() {
    return this.props.tweets.map((tweet) => {
      return (<Tweet key={tweet.id} tweet={tweet}/>);
    });
  }

  render() {
    return (
        <div className="row tweetsList">
          {this.renderTweets()}
        </div>
    );
  }
}