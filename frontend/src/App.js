import React from 'react';
import Header from './components/Header';
import GetInTouch from './components/GetInTouch';
import Blog from './components/Blog';


function App() {
  return (
    <div className="App">
      <Header />
      <div>
        <Blog />
      </div>
      <div>
        <GetInTouch />
      </div>
    </div>
  );
}

export default App;
