import { ITimeInterval } from "../types/stopwatch";

export const getStopwatchTime = (intervals: ITimeInterval[]): number => {
    let result: number = 0;

    intervals.forEach((item) => {
        result += item.time;
    });

    return result;
};

export const getTimeFromMilliseconds = (milliseconds: number): string => {
    const addZero = (value: string): string => {
        return value.length > 1 ? value : "0" + value;
    };
    let timeWithoutH = milliseconds % 3600000;
    let hours = (milliseconds - timeWithoutH) / 3600000;
    let timeWithoutHAndM = timeWithoutH % 60000;
    let minutes = (milliseconds - hours * 3600000 - timeWithoutHAndM) / 60000;
    let timeWithoutHMAndS = timeWithoutHAndM % 1000;
    let seconds = (milliseconds - hours * 3600000 - minutes * 60000 - timeWithoutHMAndS) / 1000;
    return `${addZero(hours.toString())}:${addZero(minutes.toString())}:${addZero(seconds.toString())}`;
};
