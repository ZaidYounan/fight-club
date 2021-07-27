import { render, screen } from '@testing-library/react';
import ContactView from '../ContactView';
import { BrowserRouter } from 'react-router-dom';

test('renders properly', () => {

    render(   <BrowserRouter>
                <ContactView />
              </BrowserRouter>  );

    const heading = screen.getByText(/For any enquiries:/i);
    expect(heading).toBeInTheDocument();

});
