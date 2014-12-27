
ReactElementMixin = {
  ul: React.createFactory('ul'),
  li: React.createFactory('li'),
  div: React.createFactory('div'),
  input: React.createFactory('input')
};

List = (function() {

  return React.createClass({
    mixins: [ReactElementMixin],
    render: function() {
      return (
        this.ul( {id: 'list'},
          this.li({className: 'item'}, "here's some text!")
        )
      )
    }
  });

})();


Create = (function() {

  var changeHandler = function() {
    AppAction.create('h')
  };

  return React.createClass({
    mixins: [ReactElementMixin],
    render: function() {
      return (
        this.input({id: 'create', onChange: changeHandler})
      )
    }
  });

})();


Page = React.createClass({
  mixins: [ReactElementMixin],
  render: function() {
    return (
      this.div(null,[ List(), Create() ])
    )
  }
});