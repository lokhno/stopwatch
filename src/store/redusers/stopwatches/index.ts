import { StopwatchesState, StopwatchActions, StopwatchesActionNamesEnum } from "./types";
import { IStopwatch, ITimeInterval } from "../../../types/stopwatch";

const initialState: StopwatchesState = {
    nextID: localStorage.stopwatchesNextID ||  2,
    items: localStorage.stopwatchesItems && JSON.parse(localStorage.stopwatchesItems) || [
        {
            _id: 1,
            title: "Тест секундомер",
            timeIntervals: [],
        },
    ],
};

const setLocalStorage = (items: IStopwatch[], id:number) => {
    localStorage.stopwatchesNextID = id;
    localStorage.stopwatchesItems = JSON.stringify(items)
}

const addInterval = (items: IStopwatch[], id: number, interval: ITimeInterval): IStopwatch[] => {
    let newItems: IStopwatch[] = [...items];
    newItems = newItems.map((item) => {
        if (item._id === id) {
            item.timeIntervals.push(interval);
        }
        return item;
    });
    return newItems;
};

export const excludeItems = (items: IStopwatch[], id: number): IStopwatch[] => {
    return items.filter((item: IStopwatch) => {
        return id !== item._id;
    });
};

export const stopwatchesReducer = (state = initialState, action: StopwatchActions): StopwatchesState => {
    console.log("state", state)
    let tmpState;
    switch (action.type) {
        case StopwatchesActionNamesEnum.ADD_STOPWATCH:
            tmpState = {
                ...state,
                items: [
                    ...state.items,
                    {
                        _id: state.nextID,
                        title: action.payload.title,
                        timeIntervals: action.payload.timeIntervals,
                    },
                ],
                nextID: state.nextID + 1,
            }
            setLocalStorage(tmpState.items, tmpState.nextID)
            return tmpState;
        case StopwatchesActionNamesEnum.EDIT_STOPWATCH:
            tmpState = {
                ...state,
                items: [
                    ...excludeItems(state.items, action.payload._id),
                    {
                        _id: action.payload._id,
                        title: action.payload.title,
                        timeIntervals: action.payload.timeIntervals,
                    },
                ],
            }
            setLocalStorage(tmpState.items, tmpState.nextID)
            return tmpState;
        case StopwatchesActionNamesEnum.DELETE_STOPWATCHS:
            tmpState = {
                ...state,
                items: [...excludeItems(state.items, action.payload)],
            }
            setLocalStorage(tmpState.items, tmpState.nextID)
            return tmpState;
        case StopwatchesActionNamesEnum.DELETE_TIME_INTERVALS:
            tmpState = {
                ...state,
                items: [
                    ...state.items.map((item) => {
                        if (item._id === action.payload) {
                            return { _id: item._id, title: item.title, timeIntervals: [] };
                        }
                        return item;
                    }),
                ],
            }
            setLocalStorage(tmpState.items, tmpState.nextID)
            return tmpState;
        case StopwatchesActionNamesEnum.CHANGE_TIME_INTERVAL:
            tmpState = {
                ...state,
                items: [
                    ...state.items.map((item) => {
                        
                        if (item._id === action.payload.stopwatchId) {
                            return {
                                _id: item._id,
                                title: item.title,
                                timeIntervals: [
                                    ...item.timeIntervals.map((interval) => {
                                        if (
                                            interval.startDate === action.payload.interval.startDate &&
                                            interval.stopDate === action.payload.interval.stopDate &&
                                            interval.time === action.payload.interval.time
                                        ) {
                                            return {
                                                startDate: interval.startDate,
                                                stopDate: interval.stopDate,
                                                time: interval.time,
                                                title: action.payload.interval.title,
                                            };
                                        }
                                        return interval
                                    }),
                                ],
                            };
                        }
                        return item;
                    }),
                ],
            }
            setLocalStorage(tmpState.items, tmpState.nextID)
            return tmpState;
        case StopwatchesActionNamesEnum.ADD_TIME_INTARVAL:
            tmpState = {
                ...state,
                items: addInterval(state.items, action.payload.id, action.payload.interval),
            }
            setLocalStorage(tmpState.items, tmpState.nextID)
            return tmpState;
        default:
            return state;
    }
    
};
