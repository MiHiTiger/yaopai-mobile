var React = require('react');

var CallGrapherBox = React.createClass({
  getDefaultProps: function() {
    return {
      data: {}
    };
  },
  render: function() {
    return (
      <a
        style={{lineHeight:'inherit'}} 
        href={"tel:" + this.props.data}>
        <div 
          style={{color:'#3c3c3c'}}
          className="callGrapherBox">
          <span 
            ref="callImage"
            className="icon phone_icon"
            style={{fontSize:55}} />
          <div ref="callText" >致电摄影师</div>
        </div>
      </a>
    );
  }
});

module.exports = CallGrapherBox;
