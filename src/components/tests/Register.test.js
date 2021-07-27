import Register from '../auth-components/Register';
import { act, render } from '@testing-library/react';
import { StaticRouter as Router } from 'react-router-dom'; 

describe('Register', () => {
    it('renders properly', async () => {
        const user = { email: 'test@test.com',
                       password: '12345678',
                    }
        const spy = jest.spyOn(global, 'fetch').mockImplementation(() => {
            return Promise.resolve({ ok: true, json: () => Promise.resolve(data) })
        });
        await act(async () => {
            const boxer = render(<Router><Register id={user.email}/></Router>);
        })
    });
});