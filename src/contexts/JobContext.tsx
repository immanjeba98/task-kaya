'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { Job, JobFormData, JobState, JobAction } from '@/types/job';
import jobReducer from '@/reducer/JobReducer';

const initialState: JobState = {
    jobs: [],
    filteredJobs: [],
    filters: {
        type: "",
        location: "",
        search: "",
        company: ""
    },
    currentPage: 1,
    jobsPerPage: 6,
    error: null,
    loading: false
};
const JobContext = createContext<{
    state: JobState;
    dispatch: React.Dispatch<JobAction>;
    addJob: (jobData: JobFormData) => Promise<void>;
    fetchJobs: () => Promise<void>;
    getJobById: (id: string) => Job | undefined;
} | null>(null);
export function JobProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(jobReducer, initialState);

    const fetchJobs = async () => {
        dispatch({ type: "SET_LOADING", payload: true });
        try {
            const response = await fetch("/api/jobs");
            const data = await response.json();
            dispatch({ type: "SET_JOBS", payload: data });
        } catch (error) {
            console.log(error);

            dispatch({ type: "SET_ERROR", payload: "Failed to fetch jobs" });
        } finally {
            dispatch({ type: "SET_LOADING", payload: false });
        }
    };
    useEffect(() => {
        fetchJobs()
    }, [])
    useEffect(() => {
        dispatch({ type: "FILTER_JOBS" });
    }, [state.filters, state.jobs])
    const getJobById = (id: string): Job | undefined => {
        return state.jobs.find(job => job.id === id);
    };

    const addJob = async (jobData: JobFormData) => {
        dispatch({ type: "SET_LOADING", payload: true });
        try {
            const response = await fetch("/api/jobs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(jobData),
            });
            const data = await response.json();
            dispatch({ type: "ADD_JOB", payload: data });
        } catch (error) {
            console.log(error);
            dispatch({ type: "SET_ERROR", payload: "Failed to add job" });
        } finally {
            dispatch({ type: "SET_LOADING", payload: false });
        }
    };

    return (
        <JobContext.Provider value={{ state, dispatch, addJob, fetchJobs, getJobById }}>
            {children}
        </JobContext.Provider>
    );
}
export function useJobs() {
    const context = useContext(JobContext);

    if (!context) {
        throw new Error('useJobs must be used within a JobProvider');
    }
    return context;
}