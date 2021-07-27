import { render, screen } from '@testing-library/react';
import MainSection from '../MainSection';
import { BrowserRouter } from 'react-router-dom';

test('renders link', () => {

    render(   <BrowserRouter>
                <MainSection />
              </BrowserRouter>  );

    const heading = screen.getByText(/THE SWEET SCIENCE/i);
    expect(heading).toBeInTheDocument();

    const schedule = screen.getByText(/View the Scheduled Fights/i);
    expect(schedule).toBeInTheDocument();
  
    const register = screen.getByText(/Are you a Coach?/i);
    expect(register).toBeInTheDocument();
});
