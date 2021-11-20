import React from "react";

import { Stopwatch } from "../../components/Stopwatch";
import { Create } from "../../components/Create";
import { useTypeSelector } from "../../hooks/useTypeSelector";

import "./Main.scss";

interface MainProps {}

export const Main: React.FC<MainProps> = () => {
    const stopwatches = useTypeSelector((state) => state.stopwatches.items);

    return (
        <div>
            <Create />
            {stopwatches.map((item) => {
                return <Stopwatch key={item._id} item={item} />;
            })}
            
        </div>
    );
};
