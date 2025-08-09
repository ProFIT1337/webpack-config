import React from "react";

export const App = () => {
    const [count, setCount] = React.useState(0);
    const increment = () => setCount(count + 1);

    return (
        <div>
            HelloWorld!!!!
            {count}
            <button onClick={increment}>
                Increment
            </button>
        </div>
    )
}