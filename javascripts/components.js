// requires event emitter, AppAction, Store

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
    getInitialState: function() {
      return { items: [] }
    },

    componentWillMount: function() {
      Store.onChangeEvent(this.handleStoreChange)
    },

    handleStoreChange: function() {
      this.setState({items: Store.getItems()})
    },

    render: function() {
      var ul = this.ul
      var li = this.li
      return (
        ul( {id: 'list'},
          this.state.items.map(function(text){
            return li({className: 'item'}, text)
          })
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