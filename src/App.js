import { useState, React } from 'react'; 
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Schedule from './components/pages/Schedule';
import ScheduleForm from './components/pages/ScheduleForm';
import ResultsForm from './components/pages/ResultsForm';
import Fighters from './components/pages/Fighters';
import Contact from './components/pages/Contact';
import CreateBoxer from './components/pages/CreateBoxer';
import Login from './components/auth-components/Login';
import Register from './components/auth-components/Register';
import { Redirect } from 'react-router';
import { signIn, signUp, getToken, signOut } from './api/auth';


function App() {
  const [token, setToken] = useState(getToken());
  const [flash, setFlash] = useState('');
  const signedIn = !!token;
  const [ render, setRender ] = useState(0);

  const requireAuth = render => (props => (
    signedIn ? render(props) : <Redirect to='/' />
    //Require user to be signed in otherwise redirect to index
  ));

  const handleSignIn = (email, password) => {
    signIn(email, password)
      .then(token => { setToken(token); setFlash(''); })
      .catch(err => { console.dir({ err }); setFlash('Unable to log in')})
  }

  const handleSignUp = (email, password) => {
    signUp(email, password)
      .then(token => { setToken(token) })
      .catch(error => { console.dir({ error })})
  }

  const renderNav = () => {
    if (signedIn) {
      return <Navbar/>
      //Function to re-render Navbar if signed in
    }
  }

  const renderComp= () => {
    if (signedIn) {
      setRender(1)
      //Function to re-render Navbar if signed in
    } else { setRender(0)}
  }

  return (
    <div>
        <Router>
          <Route component={Navbar} render={renderNav(() => (
              <Navbar />
            ))} />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" exact component={About} />
            <Route path="/schedule" exact component={Schedule} />
            <Route path="/schedule/new" render={requireAuth(() => (
              {renderComp},
              <ScheduleForm />
            ))} />
            <Route path="/schedule/:id" exact render={({ match }) => {
              const id = match.params.id;
              return (<ResultsForm id={id} />)
            }}/>
            <Route path="/fighters" exact component={Fighters}/>
            <Route path="/fighters/new" render={requireAuth(() => (
              {renderComp},
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
