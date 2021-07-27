import { render, screen } from '@testing-library/react';
import Navbar from '../Navbar'
import { BrowserRouter } from 'react-router-dom';

test('renders link', () => {

  render(   <BrowserRouter>
                <Navbar />
             </BrowserRouter> );
  const fightClub = screen.getByText(/Fight Club/i);
  expect(fightClub).toBeInTheDocument();

  const about = screen.getByText(/About/i);
  expect(about).toBeInTheDocument();

  const boxers = screen.getByText(/Boxers/i);
  expect(boxers).toBeInTheDocument();

  const schedule = screen.getByText(/Fight Schedule/i);
  expect(schedule).toBeInTheDocument();

  const contact = screen.getByText(/Contact Us/i);
  expect(contact).toBeInTheDocument();

  const coachSign = screen.getByText(/COACH SIGN IN/i);
  expect(coachSign).toBeInTheDocument();

  const registerCoach = screen.getByText(/REGISTER COACH/i);
  expect(registerCoach).toBeInTheDocument();
  
});
