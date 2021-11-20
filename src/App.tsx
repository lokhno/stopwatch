import { Provider } from "react-redux";

import { Main } from "./pages/Main";
import { store } from "./store";

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Main />
            </div>
        </Provider>
    );
}

export default App;
