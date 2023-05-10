import React, {Suspense, useContext} from "react";
import AuthRout from "./routing/AuthRout";

function App() {
    return (
        <Suspense fallback={'...Loading'}>
            <AuthRout/>
        </Suspense>
    );
}

export default App;
