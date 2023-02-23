// A Job object as returned by the API endpoint at
// https://feed.jobylon.com/feeds/7d7e6fd12c614aa5af3624b06f7a74b8/?format=json

// TODO: Stop using strings everywhere, add correct type aliases.

export type Job = {
    id: number
    benefits: string[]
    categories: string[]
    company: {
        id: number
        slug: string
        name: string
        name_internal: string
        website: string
        industry: string
        descr: string
        logo: string
        cover: string
    }
    contact: {
        name: string
        email: string
        phone: string
        photo: string
    }
    departments: string[]
    descr: string
    employment_type: string
    experience: string
    from_date: string
    function: string
    language: string
    layers_1: string[]
    layers_2: string[]
    layers_3: string[]
    layers_4: string[]
    layers_5: string[]
    linkedInCompanyId: number
    locations: {
        location: {
            text: string
        }
    }[]
    slug: string
    title: string
    to_date: string | null
    urls: {
        ad: string
        apply: string
    }
    video: {
        content: string | null
        url: string
    }
    internal_reference: string | null
    owner: {
        id: number
        name: string
        email: string
    }
    skills: string
}
