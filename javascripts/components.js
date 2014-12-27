
ReactElementMixin = {
  ul: React.createFactory('ul'),
  li: React.createFactory('li')
};

List = React.createClass({
  mixins: [ReactElementMixin],
  render: function() {
    return (
      this.ul( {id: 'list'},
        this.li({className: 'item'}, "here's some text!")
      )
    )
  }
});