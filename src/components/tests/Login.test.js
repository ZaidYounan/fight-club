import Login from '../auth-components/Login';
import { act, render } from '@testing-library/react';
import { StaticRouter as Router } from 'react-router-dom'; 

describe('Login', () => {
    it('renders properly', async () => {
        const user = { email: 'test@test.com',
                       password: '12345678',
                    }
        const spy = jest.spyOn(global, 'fetch').mockImplementation(() => {
            return Promise.resolve({ ok: true, json: () => Promise.resolve(data) })
        });
        await act(async () => {
            const data = render(<Router><Login id={user.email}/></Router>);
        })
    });
});