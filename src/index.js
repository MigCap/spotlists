import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/layout/App';
import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
const rootEl = document.getElementById('root');

let render = () => {
  ReactDOM.render(<App />, rootEl);
};
if (module.hot) {
  module.hot.accept('./app/layout/App', () => {
    setTimeout(render);
  });
}
render();

registerServiceWorker();