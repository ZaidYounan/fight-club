import { render, screen } from '@testing-library/react';
import AboutView from '../AboutView';
import { BrowserRouter } from 'react-router-dom';

test('renders properly', () => {

    render(   <BrowserRouter>
                <AboutView />
              </BrowserRouter>  );

    const heading = screen.getByText(/ABOUT US/i);
    expect(heading).toBeInTheDocument();

});
