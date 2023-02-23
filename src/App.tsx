import React from "react"
import { Switch, Route } from "wouter"

import JobListPage from "./pages/JobListPage"
import NotFoundPage from "./pages/NotFoundPage"

function App() {
    return (
        <div className="App">
            <Switch>
                <Route path="/" component={JobListPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    )
}

export default App
