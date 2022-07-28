import dayjs from "dayjs";

class DayjsDateProvider implements IDateProvider {
    compareInDays(start_date: Date, end_date: Date): number {
        const endDateUTC = this.convertToUTC(end_date);
        const startDateUTC = this.convertToUTC(start_date);

        return dayjs(endDateUTC).diff(startDateUTC, "days");
    }

    dateNow(): Date {
        return dayjs().toDate();
    }

    convertToUTC(date: Date): string {
        return dayjs(date).utc().local().format();
    }

    compareInHours(start_date: Date, end_date: Date): number {
        const endDateUTC = this.convertToUTC(end_date);
        const startDateUTC = this.convertToUTC(start_date);

        return dayjs(endDateUTC).diff(startDateUTC, "hours");
    }
    
}

export { DayjsDateProvider }