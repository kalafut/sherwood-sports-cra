import { monthInRange, isUpcoming } from './util';
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

test('checks if program start is within 2 months of the season', () => {
    const u = isUpcoming

    expect(u(c.JAN, [c.APR, c.JUN])).toBe(false);
    expect(u(c.FEB, [c.APR, c.JUN])).toBe(true);
    expect(u(c.MAR, [c.APR, c.JUN])).toBe(true);
    expect(u(c.APR, [c.APR, c.JUN])).toBe(true);
    expect(u(c.MAY, [c.APR, c.JUN])).toBe(false);

    expect(u(c.OCT, [c.JAN, c.FEB])).toBe(false);
    expect(u(c.NOV, [c.JAN, c.FEB])).toBe(true);
    expect(u(c.DEC, [c.JAN, c.FEB])).toBe(true);
    expect(u(c.JAN, [c.JAN, c.FEB])).toBe(true);
    expect(u(c.FEB, [c.JAN, c.FEB])).toBe(false);
})