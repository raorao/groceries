
ReactElementMixin = {
  ul: React.createFactory('ul'),
  li: React.createFactory('li'),
  div: React.createFactory('div'),
  input: React.createFactory('input'),
  form: React.createFactory('form')
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

  return React.createClass({
    mixins: [ReactElementMixin],

    submitHandler: function(event) {
      event.preventDefault();
      var itemValue = this.refs.userInput.getDOMNode().value;
      AppAction.create(itemValue);
    },

    render: function() {
      return (
        this.form({id: 'create', onSubmit: this.submitHandler}, [
          this.input({type: 'text', ref: 'userInput'}),
          this.input({ type: 'submit' })
        ])
      )
    }
  });

})();


Page = React.createClass({
  mixins: [ReactElementMixin],
  render: function() {
    return (
      this.div(null,[ Create(), List() ])
    )
  }
});