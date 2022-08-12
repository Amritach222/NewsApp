
import './App.css';
import Navbar from './components/Navbar';

import React, { useState } from 'react'
import News from './components/News';
import { 
BrowserRouter as Router,
  Switch,
  Route,
   } from 'react-router-dom';
   import LoadingBar from 'react-top-loading-bar'

const App =()=> {
  const pageSize=5;
  const apiKey=process.env.REACT_APP_NEWS_API_KEY;
  const [progress, setProgress] = useState(0)
  
 const setBarProgress=(progress)=>{
    setProgress(progress)
  }
    return (
      
      <div>
      <Router>
      <LoadingBar
      height={3}
      color='red'
      loaderSpeed={1000}
      progress={progress}
      
    />
      <Navbar/>
      <Switch>
      <Route exact path="/"><News  apiKey={apiKey} setProgress={setBarProgress}  key="general" pageSize={pageSize} country="in" category="general"/></Route>
      <Route exact path="/business"><News  apiKey={apiKey} setProgress={setBarProgress} key="business" pageSize={pageSize} country="in" category="business"/></Route>
      <Route exact path="/entertainment"><News  apiKey={apiKey} setProgress={setBarProgress} key="entertainment" pageSize={pageSize} country="in" category="entertainment"/></Route>
      <Route exact path="/health"><News  apiKey={apiKey} setProgress={setBarProgress} key="health" pageSize={pageSize} country="in" category="health"/></Route>
      <Route exact path="/science"><News  apiKey={apiKey} setProgress={setBarProgress} key="science" pageSize={pageSize} country="in" category="science"/></Route>
      <Route exact path="/sports"><News  apiKey={apiKey} setProgress={setBarProgress} key="sports" pageSize={pageSize} country="in" category="sports"/></Route>
      <Route exact path="/technology"><News  apiKey={apiKey} setProgress={setBarProgress} key="technology" pageSize={pageSize} country="in" category="technology"/></Route>
     
      </Switch>
      </Router>
      </div>
      
    )
  
}
export default App