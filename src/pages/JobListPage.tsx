import React from "react"
import { Job } from "../types/job"
import SwipeableStack from "../components/SwipeableStack"
import { LineAwesome } from "react-line-awesome-svg"

import JobCompanyIcon from "react-line-awesome-svg/icons/DotCircle"
import JobLocationIcon from "react-line-awesome-svg/icons/MapMarkerSolid"
import JobExperienceIcon from "react-line-awesome-svg/icons/UserGraduateSolid"
import EmploymentTypeIcon from "react-line-awesome-svg/icons/Hourglass"
import Button from "../components/Button"

// TODO: This could come from env.
const JOBS_API =
    "https://feed.jobylon.com/feeds/7d7e6fd12c614aa5af3624b06f7a74b8/?format=json"

// The state that the job list page can be in. An exhaustive check on the
// state is used in the render function to ensure that all possible states are
// handled.
type State =
    | { status: "loading" }
    | { status: "error"; message: string }
    | { status: "empty" }
    | { status: "swiping"; jobs: Job[] }

// TODO: Improvement: Add filtering UI to make job hunting more efficient :)
// TODO: Clicking on a job card should open a modal with more details.

export default function JobListPage() {
    const [state, setState] = React.useState<State>({ status: "loading" })

    // Fetch jobs on mount and update state accordingly.
    React.useEffect(() => {
        fetchJobs()
            .then((jobs) => {
                if (jobs.length === 0) {
                    setState({ status: "empty" })
                } else {
                    setState({ status: "swiping", jobs })
                }
            })
            .catch((error) => {
                setState({ status: "error", message: error.message })
            })
    }, [])

    // Match on the current state and render the appropriate content.
    // TODO: As this grows, each case would be moved to its own component.
    switch (state.status) {
        case "loading":
            return (
                <div className="bg-white p-4 rounded-lg text-gray-800">
                    {/* TODO: Use a generic loading component instead */}
                    Totally fake loading state...
                </div>
            )

        case "error":
            return (
                <div className="bg-white p-4 rounded-lg text-red-600">
                    <p>
                        <span>Oh no!</span> {state.message}
                    </p>
                </div>
            )

        case "empty":
            return (
                <div className="bg-white p-4 rounded-lg text-red-600">
                    No jobs found.
                </div>
            )

        case "swiping":
            return (
                <SwipeableStack>
                    {state.jobs.map((job) => (
                        <JobCard key={job.id} job={job} />
                    ))}
                </SwipeableStack>
            )

        default:
            // Thank you TypeScript for having amazing pattern matching support!
            const _: never = state
            return _
    }
}

// TODO: As this grows, it would be placed in its own file.
function JobCard({ job }: { job: Job }) {
    return (
        <div className="h-full flex flex-col items-center justify-center">
            {/* Header */}
            <div className="flex flex-col space-y-3 items-center justify-center">
                <figure className="w-16 h-16 p-2 rounded-full bg-white shadow-lg">
                    <img
                        src={job.company.logo}
                        alt={job.company.name}
                        title={job.company.name}
                        className="rounded-full"
                    />
                </figure>

                <h3 className="text-md font-bold text-center">{job.title}</h3>
            </div>

            {/* Apply */}
            <div className="mt-auto flex flex-row space-x-2 items-center justify-center">
                <Button as="a" href={job.urls.apply} target="_blank">
                    Apply now!
                </Button>
            </div>

            {/* Footer */}
            <div className="mt-auto flex flex-row space-x-2 items-center justify-center">
                {/* Company name */}
                <div className="flex flex-row space-x-1 items-center justify-center">
                    <LineAwesome icon={JobCompanyIcon} />

                    <span className="text-xs text-gray-500">
                        {job.company.name}
                    </span>
                </div>

                {/* Location */}
                <div className="flex flex-row space-x-1 items-center justify-center">
                    <LineAwesome icon={JobLocationIcon} />

                    <span className="text-xs text-gray-500">
                        {job.locations
                            .map((location) => location.location.text)
                            .join(", ")}
                    </span>
                </div>

                {/* Experience */}
                <div className="flex flex-row space-x-1 items-center justify-center">
                    <LineAwesome icon={JobExperienceIcon} />

                    <span className="text-xs text-gray-500">
                        {job.experience}
                    </span>
                </div>

                {/* Employment type */}
                <div className="flex flex-row space-x-1 items-center justify-center">
                    <LineAwesome icon={EmploymentTypeIcon} />

                    <span className="text-xs text-gray-500">
                        {job.employment_type}
                    </span>
                </div>
            </div>
        </div>
    )
}

async function fetchJobs(): Promise<Job[]> {
    // Wait for a while to simulate loading.
    await new Promise((resolve) => setTimeout(resolve, 1_000))

    return fetch(JOBS_API)
        .then((response) => response.json())
        .then((data) => data)
}
