import React from 'react';
import Header from './components/Header';
import GetInTouch from './components/GetInTouch';
import Blog from './components/Blog';
import Projects from './components/Projects';
import Fitness from './components/Fitness';


function App() {
  return (
    <div className="App">
      <Header />
      <div>
        <Fitness />
      </div>
      <div>
        <Blog />
      </div>
      <div>
        <Projects />
      </div>
      <div>
        <GetInTouch />
      </div>
    </div>
  );
}

export default App;
