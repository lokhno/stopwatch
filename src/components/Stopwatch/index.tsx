import React, { useEffect, useState } from "react";
import {
    PlayCircleOutlined,
    PauseCircleOutlined,
    RedoOutlined,
    EditOutlined,
    SaveOutlined,
    StopOutlined,
    DeleteOutlined,
    InfoCircleOutlined,
} from "@ant-design/icons";

import { Button } from "../Button";
import { getStopwatchTime, getTimeFromMilliseconds } from "../../helpers/stopwatch";
import { useStopWatchAction } from "../../hooks/useActions";

import { IStopwatch } from "../../types/stopwatch";

import "./Stopwatch.scss";
import { InfoForm } from "../InfoForm";

interface StopwatchProps {
    item: IStopwatch;
}

export const Stopwatch: React.FC<StopwatchProps> = ({ item }) => {
    const { addTimeInterval, editStopwatch, deleteStopwatch, deleteTimeIntervales } = useStopWatchAction();
    const [currentTimer, setCurrentTimer] = useState(getStopwatchTime(item.timeIntervals));
    const [state, setState] = useState<"stoped" | "goes">("stoped");
    const [start, setStart] = useState<Date | undefined>();
    const [currentTitle, setCurrentTitle] = useState(item.title);
    const [editFrom, setEditFrom] = useState<boolean>(false);
    const [overlayHidden, setOverlayHidden] = useState(true);

    useEffect(() => {
        function onKeyup(e: KeyboardEvent) {
            if (e.key === "Escape") {
                setOverlayHidden(true);
            }
        }
        window.addEventListener("keyup", onKeyup);
        return () => {
            window.removeEventListener("keyup", onKeyup);
        };
    }, []);
    let timerId = setTimeout(() => {
        if (state === "goes") {
            setCurrentTimer(currentTimer + 1000);
        }
    }, 1000);
    useEffect(() => {
        return () => {
            clearTimeout(timerId);
        };
    }, [state, currentTimer]);

    const toggleOverlay = () => {
        setOverlayHidden(!overlayHidden);
    };

    const onTimeMark = () => {
        addTimeInterval(item._id, {
            time: currentTimer - getStopwatchTime(item.timeIntervals),
            startDate: start || new Date(),
            stopDate: new Date(),
        });
        setStart(undefined);
    };

    const onToggleState = () => {
        if (state === "stoped") {
            if (!start) {
                setStart(new Date());
            }
            setState("goes");
        }
        if (state === "goes") {
            setState("stoped");
        }
    };

    const onEdit = () => {
        setEditFrom(true);
    };
    const onSave = () => {
        setEditFrom(false);
        editStopwatch({ _id: item._id, timeIntervals: item.timeIntervals, title: currentTitle });
    };
    const onDelete = () => {
        deleteStopwatch(item._id);
    };
    const onGetInfo = () => {
        toggleOverlay();
    };
    const deleteTimeIntervals = () => {
        deleteTimeIntervales(item._id);
        setCurrentTimer(0)
    };

    return (
        <div className="stopwatch">
            {!overlayHidden && <InfoForm stopwatchId={item._id} timeIntervals={item.timeIntervals} onCloseForm={toggleOverlay}></InfoForm>}
            <div className="stopwatch__menu">
                <div className="stopwatch__title">
                    {!editFrom ? (
                        item.title
                    ) : (
                        <input
                            type="text"
                            value={currentTitle}
                            onChange={(e) => {
                                setCurrentTitle(e.target.value);
                            }}
                        />
                    )}
                </div>
                <div className="stopwatch__controll">
                    {editFrom ? (
                        <Button onClick={onSave}>
                            <SaveOutlined />
                        </Button>
                    ) : (
                        <Button onClick={onEdit}>
                            <EditOutlined />
                        </Button>
                    )}{" "}
                    <Button onClick={onDelete}>
                        <DeleteOutlined />
                    </Button>
                    <Button onClick={onGetInfo}>
                        <InfoCircleOutlined />
                    </Button>
                </div>
            </div>

            <div className="stopwatch__timer">{getTimeFromMilliseconds(currentTimer)}</div>

            <div className="stopwatch__actions">
                {state === "goes" ? (
                    <Button onClick={onToggleState}>
                        <PauseCircleOutlined />
                    </Button>
                ) : (
                    <Button onClick={onToggleState}>
                        <PlayCircleOutlined />
                    </Button>
                )}
                <Button onClick={onTimeMark}>
                    <RedoOutlined />
                </Button>
                <Button onClick={deleteTimeIntervals}>
                    <StopOutlined />
                </Button>
            </div>
        </div>
    );
};
