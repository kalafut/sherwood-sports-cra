import { monthInRange } from './util';
import * as c from './consts';

test('calculates month in range', () => {
    const m = monthInRange

    expect(m(c.DEC, [c.JAN, c.MAR])).toBe(false);
    expect(m(c.JAN, [c.JAN, c.MAR])).toBe(true);
    expect(m(c.FEB, [c.JAN, c.MAR])).toBe(true);
    expect(m(c.MAR, [c.JAN, c.MAR])).toBe(true);
    expect(m(c.APR, [c.JAN, c.MAR])).toBe(false);
});

test('calculates month in range (spanning EOY)', () => {
    const m = monthInRange

    expect(m(c.OCT, [c.NOV, c.FEB])).toBe(false);
    expect(m(c.NOV, [c.NOV, c.FEB])).toBe(true);
    expect(m(c.DEC, [c.NOV, c.FEB])).toBe(true);
    expect(m(c.JAN, [c.NOV, c.FEB])).toBe(true);
    expect(m(c.FEB, [c.NOV, c.FEB])).toBe(true);
    expect(m(c.MAR, [c.NOV, c.FEB])).toBe(false);
});