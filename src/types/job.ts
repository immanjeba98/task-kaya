export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  description: string;
  requirements: string[];
  salary?: string;
  postedDate: string;
  applicationUrl?: string;
}

export interface JobFormData {
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  description: string;
  requirements: string;
  salary?: string;
  applicationUrl?: string;
}

export interface JobFilters {
  type: string;
  location: string;
  company: string;
  search: string;
}
export interface JobState {
    jobs: Job[];
    filteredJobs: Job[];
    filters: JobFilters;
    loading: boolean;
    error: string | null;
    currentPage: number;
    jobsPerPage: number;
}

export type JobAction =
  | { type: 'SET_JOBS'; payload: Job[] }
  | { type: 'ADD_JOB'; payload: Job }
  | { type: 'SET_FILTERS'; payload: Partial<JobFilters> }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CURRENT_PAGE'; payload: number }
  | { type: 'FILTER_JOBS' };