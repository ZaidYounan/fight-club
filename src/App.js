import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Schedule from './components/pages/Schedule';
import ScheduleForm from './components/pages/ScheduleForm';
import Fighters from './components/pages/Fighters';
import CreateBoxer from './components/pages/CreateBoxer';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/schedule" exact component={Schedule} />
          <Route path="/schedule/new" exact component={ScheduleForm} />
          <Route path="/fighters" exact component={Fighters}/>
          <Route path="/fighters/new" exact component={CreateBoxer}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
