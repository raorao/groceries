// requires React, list component, Dom dependencies.

window.onload = function() {
  var container = document.getElementById('container');
  React.render(List({}), container);
}