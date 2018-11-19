import React, {Component, Fragment} from 'react';

import Matrix from '../Matrix/Matrix'

class App extends Component {
  
  render() {
    return (
      <Fragment>
        <Matrix
          initialWidth={4}
          initialHeight={4}
          cellSize={50}
        />
      </Fragment>
    );
  }
}

export default App;
