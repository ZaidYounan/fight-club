import ScheduleView from '../ScheduleView';
import { act, render } from '@testing-library/react';
import { StaticRouter as Router } from 'react-router-dom'; 

describe('ScheduleView', () => {
    it('renders properly', async () => {
        const data = {
                    fight_id: 1,
                    boxer_a_id: 1,
                    boxer_b_id: 2,
                    time_scheduled: 1200,
                    rounds: 3,
                    round_time: 1.30,
                    winner_id: 2,
                    loser_id: 1,
                    result: 'KO',
                    gym_id: 1,
                    }
        const spy = jest.spyOn(global, 'fetch').mockImplementation(() => {
            return Promise.resolve({ ok: true, json: () => Promise.resolve(data) })
        });

        await act(async () => {
            const fight = render(<Router><ScheduleView fight_id={1}/></Router>);
        })
    });
});