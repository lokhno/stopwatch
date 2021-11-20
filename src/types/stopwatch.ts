export interface ITimeInterval {
    time: number;
    startDate: Date;
    stopDate: Date;
    title?: string;
}

export interface StateType {
    name: "stoped" | "goes";
    lastStart?: Date;
}

export interface INewStopwatch {
    _id?: number;
    title: string;
    timeIntervals: ITimeInterval[];
}

export interface IStopwatch extends INewStopwatch {
    _id: number;
}
