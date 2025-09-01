import { DateUtils } from './date.utils';

describe('DateUtils', () => {
    describe('getCurrentYear', () => {
        it('deve retornar o ano atual', () => {
            const currentYear = new Date().getFullYear();
            expect(DateUtils.getCurrentYear()).toBe(currentYear);
        });
    });

    describe('getMaxYear', () => {
        it('deve retornar o ano atual mais o offset padrão (1)', () => {
            const currentYear = new Date().getFullYear();
            expect(DateUtils.getMaxYear()).toBe(currentYear + 1);
        });

        it('deve retornar o ano atual mais o offset informado', () => {
            const currentYear = new Date().getFullYear();
            expect(DateUtils.getMaxYear(5)).toBe(currentYear + 5);
            expect(DateUtils.getMaxYear(0)).toBe(currentYear);
            expect(DateUtils.getMaxYear(-1)).toBe(currentYear - 1);
        });
    });
});
