import { JobState, JobAction } from '@/types/job'

export default function jobReducer(state: JobState, action: JobAction): JobState {
    switch (action.type) {
        case 'SET_JOBS':
            return { ...state, jobs: action.payload, filteredJobs: action.payload };
        case 'ADD_JOB':
            const newJobs = [action.payload, ...state.jobs]
            return { ...state, jobs: newJobs, filteredJobs: newJobs }
        case 'SET_FILTERS':
            return { ...state, filters: { ...state.filters, ...action.payload }, currentPage: 1 };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        case 'SET_CURRENT_PAGE':
            return { ...state, currentPage: action.payload };
        case 'FILTER_JOBS':
            let filtered = state.jobs;

            if (state.filters.search) {
                filtered = filtered.filter(job =>
                    job.title.toLowerCase().includes(state.filters.search.toLowerCase()) ||
                    job.company.toLowerCase().includes(state.filters.search.toLowerCase()) ||
                    job.description.toLowerCase().includes(state.filters.search.toLowerCase())
                );
            }

            if (state.filters.type) {
                filtered = filtered.filter(job => job.type === state.filters.type);
            }

            if (state.filters.location) {
                filtered = filtered.filter(job =>
                    job.location.toLowerCase().includes(state.filters.location.toLowerCase())
                );
            }

            if (state.filters.company) {
                filtered = filtered.filter(job =>
                    job.company.toLowerCase().includes(state.filters.company.toLowerCase())
                );
            }

            return { ...state, filteredJobs: filtered };
        default:
            return state;
    }
}