import { render, screen } from '@testing-library/react';
import BoxerView from '../BoxerView'
import ReactDOM from 'react-dom';

it('renders without crashing', () => {
  let div = null
  beforeEach(() => {
    div = document.createElement('div');
    render(<BoxerView />, div);
    expect(div).toBeInTheDocument();
  });

  afterEach(() => {
    unmountComponentAtNode(div);
    div.remove();
    div = null;
  })
 
});


describe('BoxerView')

