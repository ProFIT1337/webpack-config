import React from "react";

import './App.scss';

export const App = () => {
    const [count1, setCount] = React.useState(0);
    const increment = () => setCount(count1 + 1);

    return (
        <div className="test">
            HelloWorld!!!!!!!!!!!!
            {count1}
            <button onClick={increment} className="test__btn">
                Increment121
            </button>
        </div>
    )
}