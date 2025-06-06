'use client';
import JobCard from '@/components/ui/JobCard';
import JobFilters from '@/components/ui/JobFilters';
import { useJobs } from '@/contexts/JobContext';
import React from 'react';

export default function Home() {
    const { state } = useJobs();
    const { filteredJobs, jobs, loading, error, currentPage } = state;
    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg text-gray-600">Loading jobs...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-center items-center h-64">
                    <div className="text-lg text-red-600">Error: {error}</div>
                </div>
            </div>
        );
    }
    return (
        <div className='p-4'>
            <JobFilters />
            {
                filteredJobs.length > 0 && <JobCard jobs={filteredJobs} />
            }
        </div>
    )
}