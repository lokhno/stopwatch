import React, { useState } from "react";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";

import { useStopWatchAction } from "../../../hooks/useActions";
import { ITimeInterval } from "../../../types/stopwatch";
import { Button } from "../../Button";
import { getStopwatchTime, getTimeFromMilliseconds } from "../../../helpers/stopwatch";

interface InfoFormItemProps {
    stopwatchId: number
    item: ITimeInterval
}

export const InfoFormItem: React.FC<InfoFormItemProps> = ({item, stopwatchId}) => {
    const [editFrom, setEditFrom] = useState(false);
    const [currentTitle, setCurrentTitle] = useState("");
    const { changeTimeInterval } = useStopWatchAction();
    const onEdit = () => {
        setEditFrom(true);
    };
    const onSave = (item: ITimeInterval) => {
        changeTimeInterval({ title: currentTitle, startDate: item.startDate, stopDate: item.stopDate, time: item.time }, stopwatchId);
        setEditFrom(false);
    };
    return (
        <div className="form__item form-item">
            <div className="form-item__action">
                {editFrom ? (
                    <Button onClick={() => onSave(item)}>
                        <SaveOutlined />
                    </Button>
                ) : (
                    <Button onClick={onEdit}>
                        <EditOutlined />
                    </Button>
                )}
            </div>
            <div className="form-item__time">{getTimeFromMilliseconds(getStopwatchTime([item]))}</div>
            <div className="form-item__title">
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
        </div>
    );
};
