import React, {Component} from "react";
import {PropTypes} from "prop-types";
import { Meteor } from "meteor/meteor";
import { createContainer} from "meteor/react-meteor-data";
import ColombiaMap from "./ColombiaMap.jsx";
import TweetsList from "./TweetsList.jsx";
import {Tweets} from "../api/Tweets.js";

import Overlay from "./Overlay.jsx";

export class App extends Component {
  constructor(props) {
    super(props);
    this.projection = null;
    this.tweets=[];
    this.called=false;

    this.setProjection=this.setProjection.bind(this);
    this.getProjection=this.getProjection.bind(this);
    this.addTweets=this.addTweets.bind(this);
  }

  changeQuery(evt) {
    if (evt.key !== "Enter") {
      return;
    }
    // "this" will change in the method call, so I need to save it
    let component = this;

    console.log(evt.target.value);
    Meteor.call("twitter.stream", evt.target.value);

  }
  getProjection()
  {
    return this.projection;
  }
  setProjection(pProjection)
  {
    this.projection=pProjection;
    // console.log('actualizo el projection');
  }
  componentWillMount()
  {
    if(!this.called)
    {
      Meteor.call("twitter.stream", 'Colombia');
      this.called=true;
    }
  }
  componentWillReceiveProps()
  {
    this.addTweets(this.props.tweets);
  }
  addTweets(tweets)
  {
    tweets.forEach((tweet)=>
    {
      let rta = this.tweets.find((oldTweet)=>{return oldTweet.id==tweet.id});
      if(!rta)
      {
        this.tweets.unshift(tweet);
      }
    });

  }

  render() {
    console.log("render!");

    return (

    <div className="row">
      {this.props && this.props.tweets ?
            <div className="col-md-8">
              <ColombiaMap width={Math.floor(($(document).width())*(2/3))} height={$(document).height()} data={{RISARALDA:10}} setProjection={this.setProjection}> </ColombiaMap>
              <Overlay tweets={this.tweets} getProjection={this.getProjection} width={Math.floor(($(document).width())*(2/3))} height={$(document).height()}/>
            </div>

          :
          <p>Enter a query</p>
      }
      <div className="col-md-4 tweetsBox">
        <h1 className="main-title">Colombian Tweets ({this.tweets.length})</h1>
      { this.props && this.props.err ?
          <div>Error: {this.props.err}</div> :
          <span></span>
      }
      <TweetsList tweets={this.tweets}/>
      </div>
    </div>

    );
  }
}

App.propTypes = {
  tweets : PropTypes.array.isRequired
};

export default AppContainer = createContainer(() => {
  Meteor.subscribe("tweets");


  return {
    tweets: Tweets.find({}).fetch().filter((tweet)=>tweet.coordinates)
  };
}, App);