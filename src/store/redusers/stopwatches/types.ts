import { IStopwatch, INewStopwatch, ITimeInterval } from "../../../types/stopwatch";

export interface StopwatchesState {
    nextID: number;
    items: IStopwatch[];
}

export enum StopwatchesActionNamesEnum {
    ADD_STOPWATCH = "ADD_STOPWATCH",
    DELETE_STOPWATCHS = "DELETE_STOPWATCHS",
    EDIT_STOPWATCH = "EDIT_STOPWATCH",
    DELETE_TIME_INTERVALS = "DELETE_TIME_INTERVALS",
    CHANGE_TIME_INTERVAL = "CHANGE_TIME_INTERVAL",
    ADD_TIME_INTARVAL = "ADD_TIME_INTARVAL",
}

interface AddStopwatchAction {
    type: StopwatchesActionNamesEnum.ADD_STOPWATCH;
    payload: INewStopwatch;
}

interface AddTimeIntervalAction {
    type: StopwatchesActionNamesEnum.ADD_TIME_INTARVAL;
    payload: { id: number; interval: ITimeInterval };
}
interface DeleteStopwatchAction {
    type: StopwatchesActionNamesEnum.DELETE_STOPWATCHS;
    payload: number;
}

interface EditStopwatchAction {
    type: StopwatchesActionNamesEnum.EDIT_STOPWATCH;
    payload: IStopwatch;
}
interface DeleteTimeIntervalesAction {
    type: StopwatchesActionNamesEnum.DELETE_TIME_INTERVALS;
    payload: number;
}
interface ChangeTimeIntervalAction {
    type: StopwatchesActionNamesEnum.CHANGE_TIME_INTERVAL;
    payload: { interval: ITimeInterval; stopwatchId: number };
}

export type StopwatchActions =
    | AddStopwatchAction
    | DeleteStopwatchAction
    | EditStopwatchAction
    | AddTimeIntervalAction
    | ChangeTimeIntervalAction
    | DeleteTimeIntervalesAction;
