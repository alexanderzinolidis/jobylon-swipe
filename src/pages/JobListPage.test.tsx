import { render, screen, fireEvent } from "@testing-library/react"
import { rest } from "msw"
import { setupServer } from "msw/node"
import { act } from "react-dom/test-utils"
import JobListPage from "./JobListPage"

// TODO: This could come from env.
const API_URL =
    "https://feed.jobylon.com/feeds/7d7e6fd12c614aa5af3624b06f7a74b8"

const server = setupServer(
    rest.get(API_URL, (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    id: "1",
                    title: "Test Job",
                    company: { name: "Test Company", logo: "" },
                    locations: [{ location: { text: "Test Location" } }],
                    experience: "Test Experience",
                    employment_type: "Test Employment Type",
                    urls: { apply: "http://test-apply-url.com" },
                },
            ])
        )
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("JobListPage component", () => {
    it("renders without crashing", () => {
        render(<JobListPage />)
    })

    it("shows a loading state when jobs are being fetched", () => {
        render(<JobListPage />)
        expect(
            screen.getByText("Totally fake loading state...")
        ).toBeInTheDocument()
    })

    it("shows error state when job fetching fails", async () => {
        server.use(
            rest.get(API_URL, (req, res, ctx) => {
                return res(ctx.status(500))
            })
        )

        render(<JobListPage />)
        await waitForLoading()
        expect(await screen.findByText("Oh no!")).toBeVisible()
    })

    it("shows empty state when no jobs are fetched", async () => {
        server.use(
            rest.get(API_URL, (req, res, ctx) => {
                return res(ctx.json([]))
            })
        )

        render(<JobListPage />)
        await waitForLoading()
        expect(await screen.findByText("No jobs found.")).toBeInTheDocument()
    })

    it("shows job cards when jobs are fetched", async () => {
        render(<JobListPage />)
        await waitForLoading()
        expect(await screen.findByText("Test Job")).toBeInTheDocument()
    })
})

// Wait for a while to simulate loading.
async function waitForLoading() {
    await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 1050))
    })
}
