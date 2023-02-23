import { Switch, Route } from "wouter"
import JobListPage from "./pages/JobListPage"
import NotFoundPage from "./pages/NotFoundPage"

/*
    Nothing fancy here, just using wouter to route `/` to the job list page.
    If no route matches, a 404 page is rendered.

    Obviously, wouter is overkill for this simple demo, but in the real world
    we'd use it to route to other pages, such as a job details page when clicking
    on a job card.
*/

export default function App() {
    return (
        <div className="App bg-[#4992fc] h-screen flex items-center justify-center overflow-y-hidden">
            <Switch>
                <Route path="/" component={JobListPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    )
}
