export class DateUtils {
    static getCurrentYear(): number {
        return new Date().getFullYear();
    }

    static getMaxYear(offset: number = 1): number {
        return this.getCurrentYear() + offset;
    }
}
