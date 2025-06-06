'use client';
import JobCard from '@/components/ui/JobCard';
import JobFilters from '@/components/ui/JobFilters';
import Pagination from '@/components/ui/Pagination';
import { useJobs } from '@/contexts/JobContext';
import React from 'react';

export default function Home() {
    const { state, dispatch } = useJobs();
    const { filteredJobs, loading, error, currentPage, jobsPerPage } = state;

    // Pagination calculations
    const totalJobs = filteredJobs.length;
    const totalPages = Math.ceil(totalJobs / jobsPerPage);
    const startIndex = (currentPage - 1) * jobsPerPage;
    const endIndex = startIndex + jobsPerPage;
    const currentJobs = filteredJobs.slice(startIndex, endIndex);

    const handlePageChange = (page:number) => {
        dispatch({ type: 'SET_CURRENT_PAGE', payload: page });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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
            
            {filteredJobs.length > 0 ? (
                <>
                    <div className="mb-4 text-sm text-gray-600">
                        {totalJobs} jobs found • Page {currentPage} of {totalPages}
                    </div>
                    <JobCard jobs={currentJobs} />
                    <Pagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </>
            ) : (
                <div className="text-center py-8 text-gray-500">
                    No jobs found.
                </div>
            )}
        </div>
    );
}