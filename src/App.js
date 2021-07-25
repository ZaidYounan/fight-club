import { useState, React } from 'react'; 
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Schedule from './components/pages/Schedule';
import ScheduleForm from './components/pages/ScheduleForm';
import Fighters from './components/pages/Fighters';
import Contact from './components/pages/Contact';
import CreateBoxer from './components/pages/CreateBoxer';
import Login from './components/auth-components/Login';
import Register from './components/auth-components/Register';
import { Redirect } from 'react-router';
import { signIn, signUp, getToken, signOut } from './api/auth';
import * as ActiveStorage from "activestorage";
ActiveStorage.start()

function App() {
  const [token, setToken] = useState(getToken());
  const [flash, setFlash] = useState('');
  const [currentUser, setCurrentUser] = useState(undefined);
  const signedIn = !!token;

  const requireAuth = render => (props => (
    signedIn ? render(props) : <Redirect to='/' />
  ));

  const handleSignIn = (email, password) => {
    signIn(email, password)
      .then(token => { setToken(token); setFlash('') })
      .catch(err => { console.dir({ err }); setFlash('Unable to log in')})
  }

  const handleSignUp = (email, password) => {
    signUp(email, password)
      .then(token => { setToken(token) })
      .catch(error => { console.dir({ error })})
  }


  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/schedule" exact component={Schedule} />
          <Route path="/schedule/new" render={requireAuth(() => (
            <ScheduleForm />
          ))} />
          <Route path="/fighters" exact component={Fighters}/>
          <Route path="/fighters/new" render={requireAuth(() => (
            <CreateBoxer />
          ))} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/sign-in" exact component={Login} onSignIn={handleSignIn}/>
          <Route path="/sign-up" exact component={Register} onSignUp={handleSignUp}/>
          <Route path='/signout' render={signOut} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
