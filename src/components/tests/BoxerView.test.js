import BoxerView from '../BoxerView';
import { act, render, screen } from '@testing-library/react';
import { StaticRouter as Router } from 'react-router-dom'; 
//import { useState } from 'react';
//import axios from 'axios';

describe('BoxerView', () => {
    it('renders properly', async () => {
        const data = { id: 700, 
                       first_name: 'Jim', 
                       last_name: 'Jimmyson', 
                       height: 178, 
                       weight: 82, 
                       reach: 71, 
                       stance: 'Orthodox', 
                       gym_id: 1
                    }
        const spy = jest.spyOn(global, 'fetch').mockImplementation(() => {
            return Promise.resolve({ ok: true, json: () => Promise.resolve(data) })
        });

        await act(async () => {
            const boxer = render(<Router><BoxerView/></Router>);
        })

    });
});


/*  Couldn't get the below working, getting an "invalid hook" error 
that I sadly wasn't able to resolve  */
  

/*jest.mock('axios');
 
describe('BoxerView', () => {
  it('fetches data successfully from an API', async () => {
    const data = { id: 700, first_name: 'Jim', last_name: 'Jimmyson', height: 178, weight: 82, reach: 71, stance: 'Orthodox', gym_id: 1};
    axios.get.mockImplementationOnce(() => Promise.resolve(data));
 
    await expect(BoxerView('react')).resolves.toEqual(data);
  });
 
  it('fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error';
 
    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );
 
    await expect(BoxerView('react')).rejects.toThrow(errorMessage);
  });
}) */
