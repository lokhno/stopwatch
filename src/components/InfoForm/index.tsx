import React from "react";

import classnames from "classnames";

import { InfoFormItem } from "./InfoFormItem";
import { ITimeInterval } from "../../types/stopwatch";

import "./InfoForm.scss";

interface InfoFormProps {
    timeIntervals: ITimeInterval[];
    onCloseForm: () => void;
    stopwatchId: number;
}

export const InfoForm: React.FC<InfoFormProps> = ({ timeIntervals, onCloseForm, stopwatchId }) => {
    return (
        <>
            <div className={classnames("background")} onClick={onCloseForm}></div>

            <div className="form">
                {timeIntervals.length === 0
                    ? "Нет отсечек времени"
                    : timeIntervals.map((item, index) => {
                          return <InfoFormItem key={index} item={item} stopwatchId={stopwatchId}/>;
                      })}
            </div>
        </>
    );
};
