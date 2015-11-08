var React = require('react');
var Reflux = require('reflux');
import { Router, Route, Link } from 'react-router';

var ReactSwipe = require('react-swipe');
var DocumentTitle = require('react-document-title');
var UserActions = require('../../actions/UserActions');
var PhotographerActions = require('../../actions/PhotographerActions');
var PhotographerStore = require('../../stores/PhotographerStore');
var AlbumsActions = require('../../actions/AlbumsActions');
var AlbumsStore = require('../../stores/AlbumsStore');
require('./index.css');

var HamburgMenu = require('../HamburgMenu');
var Footer = require('./Footer');
var ImageBoxGrid = require('./ImageBoxGrid');
var ImageVerticalGrid = require('./ImageVerticalGrid');
var Index = React.createClass({
  mixins : [Reflux.listenTo(PhotographerStore,'_onPhotographerStoreChange'),Reflux.listenTo(AlbumsStore,'_onAlbumsStoreChange')],
  getDefaultProps: function() {
    return {
      imgs: [
        { src: "slider-furui.jpg", 
          srcset: "slider-furui.jpg 2x", 
          url: "http://mp.weixin.qq.com/s?__biz=MzIxMzAyNjg1Nw==&mid=208614841&idx=1&sn=836f0d5ee6dfe2faffb8e1b050224cdc#rd" },  
        {
          src: "slider-hedaxun.gif", 
          srcset: "slider-hedaxun.gif 2x", 
          url: "http://mp.weixin.qq.com/s?__biz=MzIxMzAyNjg1Nw==&mid=208598870&idx=1&sn=431cf10eccd393d158a862b8df936c1a#rd" },  
        { 
          src: "slider-jiran.jpg", 
          srcset: "slider-jiran.jpg 2x", 
          url: "http://mp.weixin.qq.com/s?__biz=MzIxMzAyNjg1Nw==&mid=208321425&idx=1&sn=ca3c63684cd62f5477fc82b575d795f2#rd" },  
        {
          src: "slider-xiaoweixuezhang.jpg", 
          srcset: "slider-xiaoweixuezhang.jpg 2x", 
          url: "http://mp.weixin.qq.com/s?__biz=MzIxMzAyNjg1Nw==&mid=208744868&idx=2&sn=be7d83600a079a70bbb266d23b7f09df#rd" },
        {
          src: "slider-yexiaokui.jpg", 
          srcset: "slider-yexiaokui.jpg 2x", 
          url: "http://mp.weixin.qq.com/s?__biz=MzIxMzAyNjg1Nw==&mid=208697675&idx=1&sn=7b4ad41ae6d6d659b9b79fe6505ce244#rd" }
      ]
    };
  },
  getInitialState: function() {
    return {
      currentSlider: 0,
      userData : {},
      recommendGraphers : [],
      recommendWorks : [],
    };
  },
  componentDidMount : function () {
    UserActions.currentUser();
    //得到推荐摄影师
    PhotographerActions.recommendList();
    //得到推荐作品
    AlbumsActions.recommendList();
  },
  _onAlbumsStoreChange : function(data){
    if(data.flag == 'recommendList'){
      if(data.hintMessage){
        console.log(data.hintMessage);
      }else{
        this.setState({recommendWorks : data.workList});
      }
    }
  },
  _onPhotographerStoreChange : function(data){
    if(data.flag == 'recommendList'){
      if(data.hintMessage){
        console.log(data.hintMessage);
      }else{
        this.setState({recommendGraphers : data.photographers});
      }
    }
  },
  updateSliderButtons: function(position){
    // console.log(position);
    this.setState({currentSlider: position});
  },

  autoNextPageOnSwiped: function(index, elem){
    // console.log("to next page",this);
  },

  render: function() {
    var ImgNodes = this.props.imgs.map(function(img, i){
      return (
        <div>
          <a href={img.url} >
            <img 
              src={"imgs/indexPage/" + img.src} 
              srcSet={"imgs/indexPage/" + img.srcset} 
              width="100%" />
          </a>
        </div>
      ); 
    });

    var currentSlider = this.state.currentSlider;
    var sliderButtons = this.props.imgs.map(function(img, i){
      if (i == currentSlider){
        return ( 
          <img className="currentCarousel" 
            src="imgs/indexPage/current-carousel.png"
            srcSet="imgs/indexPage/current-carousel@2X.png 2x" />
          );
      } else {
        return (
          <img 
            src="imgs/indexPage/normal-carousel.png"
            srcSet="imgs/indexPage/normal-carousel@2X.png 2x" />
        );  
      }
      
    });
    return (
      <DocumentTitle title="YAOPAI：一个全球预约摄影师平台">
      <div className="index">
        <HamburgMenu />
        <div className="sliderBox" >
          <ReactSwipe 
            continuous={true} 
            auto={3000}
            speed={500}
            stopPropagation={false}
            callback = {this.updateSliderButtons}
            transitionEnd = {this.autoNextPageOnSwiped} >
            {ImgNodes}
          </ReactSwipe>
          <div className="sliderButtonsLine" >
             <div className="sliderButtons" >
              {sliderButtons}
            </div>
          </div>
        </div>
      
        <div className="indexContent">
          <div className="spliterWork" >
              <img src="imgs/indexPage/icon-works.png"
                srcSet="imgs/indexPage/icon-works@2X.png 2x" />
              <div className="splitLine" >
                <img 
                  src="imgs/common/spliter-line.png"
                  srcSet="imgs/common/spliter-line@2X.png 2x" />
              </div>
              <div className="splitContent">
                <div>作品</div>
                <div>WORKS</div>
              </div>
          </div>

          <ImageBoxGrid works={this.state.recommendWorks}/>

          <div className="spliterGrapher" >
              <img 
                src="imgs/indexPage/icon-grapher.png"
                srcSet="imgs/indexPage/icon-grapher@2X.png 2x" />
              <div className="splitLine" >
                <img 
                  src="imgs/common/spliter-line.png"
                  srcSet="imgs/common/spliter-line@2X.png 2x" />
              </div>
              <div className="splitContent">
                <div>摄影师</div>
                <div>PHOTOGRAPHER</div>
              </div>
          </div>

          <ImageVerticalGrid works={this.state.recommendGraphers}/>

          <div className="spliterInterview" >
              <img 
                src="imgs/indexPage/icon-interview.png"
                srcSet="imgs/indexPage/icon-interview@2X.png 2x" />
              <div className="splitLine" >
                <img 
                  src="imgs/common/spliter-line.png"
                  srcSet="imgs/common/spliter-line@2X.png 2x" />
              </div>
              <div className="splitContent">
                <div>访谈</div>
                <div>INTERVIEW</div>
              </div>
          </div>

          <div className="imageRectGrid">
            <img 
              src="imgs/indexPage/interview-demo.jpg"
              srcSet="imgs/indexPage/interview-demo@2X.jpg 2x" />
          </div>

          <div className="spliterActivity" >
              <img 
                src="imgs/indexPage/icon-activity.png"
                srcSet="imgs/indexPage/icon-activity@2X.png 2x" />
              <div className="splitLine" >
                <img 
                  src="imgs/common/spliter-line.png"
                  srcSet="imgs/common/spliter-line@2X.png 2x" />
              </div>
              <div className="splitContent">
                <div>活动</div>
                <div>ACTIVITY</div>
              </div>
          </div>

          <div className="imageCircleGrid">
            <img 
              src="imgs/indexPage/activity-demo.jpg"
              srcSet="imgs/indexPage/activity-demo@2X.jpg 2x" />
          </div>

          <Footer />

        </div>

      </div>
      </DocumentTitle>
      );
  }
});

module.exports = Index;