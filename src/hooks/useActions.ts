import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { allStopwatchActionCreators } from "../store/action-creators/stopwatch";

export const useStopWatchAction = () => {
    const dispatch = useDispatch();
    return bindActionCreators(allStopwatchActionCreators, dispatch);
};
