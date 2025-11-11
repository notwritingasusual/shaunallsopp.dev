import React from 'react';
import Header from './components/Header';
import GetInTouchBottom from './components/GetInTouchBottom';
import Blog from './components/Blog';
import Projects from './components/Projects';
import Fitness from './components/Fitness';
import Writing from './components/Writing';



function App() {
  return (
    <div className="App p-0 lg:p-[50px] xl:p-[100px]">
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
        <Writing />
      </div>
      <div>
        <GetInTouchBottom />
      </div>
      
      {/* Footer */}
      <footer className="w-full text-center p-6 mt-10 border-t border-gray-300 font-mono text-sm text-gray-600">
        © {new Date().getFullYear()} Shaun Allsopp. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
