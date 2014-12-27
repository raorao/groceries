List = React.createClass({
  render: function() {
    var ul = React.createFactory('ul');
    var li = React.createFactory('li');

    return (
      ul( {id: 'list'},
        li({className: 'item'}, "here's some text!")
      )
    )
  }
});