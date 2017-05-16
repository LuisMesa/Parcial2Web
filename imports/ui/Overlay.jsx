import React, {Component} from "react";

import Tweet from "./Tweet.jsx";

export default class Overlay extends Component {
  constructor(props) {
    super(props);
    this.renderTweets=this.renderTweets.bind(this);
  }
  renderTweets() {
    //Va en component will update ?
    console.log('rendering tweets, there are '+this.props.tweets.length+' tweets');
    this.props.tweets.map((tweet) => {
      if(tweet.coordinates)
      {
        let long=tweet.coordinates.coordinates[0];
        let lat=tweet.coordinates.coordinates[1];
        // console.log(long+' , '+lat);
        // console.log(this.props.getProjection);
        let x= this.props.getProjection()()([long,lat])[0];
        let y= this.props.getProjection()()([long,lat])[1];
        // console.log(x+' , '+y);
        //Draw the Circle
        let canvas = document.getElementById('canvasForTweets');
        let context = canvas.getContext('2d');
        let centerX = canvas.width / 2;
        let centerY = canvas.height / 2;
        let radius = 5;

        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI, false);
        context.fillStyle = 'green';
        context.fill();
        context.lineWidth = 2;
        context.strokeStyle = '#000';
        context.stroke();
      }
    });
  }

  render() {
    return (
        <canvas id="canvasForTweets" width={this.props.width} height={this.props.height}>
          {this.renderTweets()}
        </canvas>
    );
  }
}