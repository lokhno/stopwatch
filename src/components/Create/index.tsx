import React, { useState } from "react";
import classNames from "classnames";
import { PlusCircleOutlined } from "@ant-design/icons";

import { useStopWatchAction } from "../../hooks/useActions";

import "./Create.scss";

interface CreateProps {}

export const Create: React.FC<CreateProps> = () => {
    const [title, setTitle] = useState<string>("");
    const [inputError, setInputError] = useState<boolean>(false)
    const { addStopwatch } = useStopWatchAction();
    const handleClick = () => {
        if(title) {
            addStopwatch({ title: title, timeIntervals: [] });
            setTitle("");
        } else {
            setInputError(true)
        }
    };
    return (
        <div className="create">
            
            <div className="create__button" onClick={handleClick}>
                <PlusCircleOutlined />
                Создать таймер
            </div>
            <input
                className={classNames({input__error: inputError})}
                value={title}
                onChange={(e) => {
                    setTitle(e.target.value);
                    setInputError(false)
                }}
                type="text"
            />
        </div>
    );
};
