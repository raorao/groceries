// requires event emitter, AppAction, Store

ReactElementMixin = {
  ul: React.createFactory('ul'),
  li: React.createFactory('li'),
  div: React.createFactory('div'),
  input: React.createFactory('input'),
  form: React.createFactory('form'),
  span: React.createFactory('span')
};

Item = (function() {
  return React.createClass({
    mixins: [ReactElementMixin],
    handleCompletion: function() {
      AppAction.update(this.props.id, {completed: !this.props.completed} );
    },

    handleDeletion: function() {
      AppAction.delete(this.props.id);
    },

    handleEdit: function() {
      var itemValue = this.refs.userInput.getDOMNode().value;
      AppAction.update(this.props.id, {value: itemValue} );
    },

    render: function() {
      var completed = (this.props.completed ? 'completed' : null)

      return (
        this.li({className: 'item ' + completed}, [
          this.span({ onClick: this.handleCompletion },'complete'),
          this.input({ onBlur: this.handleEdit, ref: 'userInput', defaultValue: this.props.value }),
          this.span({ onClick: this.handleDeletion },'delete'),

        ])
      )
    }
  });

})();


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
      return (
        this.ul( {id: 'list'},
          this.state.items.map(function(itemData){
            return Item(itemData);
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