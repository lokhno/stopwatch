import { INewStopwatch, IStopwatch, ITimeInterval } from "../../types/stopwatch";
import { StopwatchActions, StopwatchesActionNamesEnum } from "../redusers/stopwatches/types";

const stopwatchActionCreators = {
    addStopwatch: (item: INewStopwatch): StopwatchActions => ({
        type: StopwatchesActionNamesEnum.ADD_STOPWATCH,
        payload: item,
    }),
    deleteStopwatch: (id: number): StopwatchActions => ({
        type: StopwatchesActionNamesEnum.DELETE_STOPWATCHS,
        payload: id,
    }),
    deleteTimeIntervales: (id: number): StopwatchActions => ({
        type: StopwatchesActionNamesEnum.DELETE_TIME_INTERVALS,
        payload: id,
    }),
    changeTimeInterval: (interval: ITimeInterval, stopwatchId: number): StopwatchActions => ({
        type: StopwatchesActionNamesEnum.CHANGE_TIME_INTERVAL,
        payload: { interval, stopwatchId },
    }),
    editStopwatch: (item: IStopwatch): StopwatchActions => ({
        type: StopwatchesActionNamesEnum.EDIT_STOPWATCH,
        payload: item,
    }),
    addTimeInterval: (id: number, interval: ITimeInterval): StopwatchActions => ({
        type: StopwatchesActionNamesEnum.ADD_TIME_INTARVAL,
        payload: { id, interval },
    }),
};

export const allStopwatchActionCreators = {
    ...stopwatchActionCreators,
};
