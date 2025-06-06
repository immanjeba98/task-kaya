'use client';

import { useJobs } from '@/contexts/JobContext';
import { X } from 'lucide-react';

export default function JobFilters() {
    const { state: { filters }, dispatch } = useJobs();

    const handleFilterChange = (key: keyof typeof filters, value: string) => {
        dispatch({ type: 'SET_FILTERS', payload: { [key]: value } });
    };

    const clearFilters = () => {
        dispatch({
            type: 'SET_FILTERS',
            payload: { type: '', location: '', company: '', search: '' }
        });
    };

    const hasActiveFilters = Object.values(filters).some(value  => value !== '');

    return (
        <div className="card mb-6">
            <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">Filter Jobs</h2>
                    {hasActiveFilters && (
                        <div className='flex items-center justify-between  bg-red-100 border border-red-400 rounded-md px-2 py-1 text-red-400 text-sm '>
                            <X className="h-4 w-4 mr-1 text-red-400" />
                            <button
                                onClick={clearFilters}
                                className="flex items-centertext-gray-500 hover:text-gray-700"
                            >
                                Clear all
                            </button>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Search */}
                    <div className=" ">
                        <input
                            type="text"
                            placeholder="Search jobs..."
                            value={filters.search}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                            className="input w-full border text-gray-600 border-gray-300 rounded-md px-2 py-1"
                        />
                    </div>

                    {/* Job Type */}
                    <div className="">
                        <select
                            value={filters.type}
                            onChange={(e) => handleFilterChange('type', e.target.value)}
                            className="input w-full px-2 h-9 text-gray-600  border border-gray-300 rounded-md"
                        >
                            <option value="">All Types</option>
                            <option value="full-time">Full Time</option>
                            <option value="part-time">Part Time</option>
                            <option value="contract">Contract</option>
                            <option value="remote">Remote</option>
                        </select>
                    </div>

                    {/* Location */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Location..."
                            value={filters.location}
                            onChange={(e) => handleFilterChange('location', e.target.value)}
                            className="input w-full px-2 py-1 border text-gray-600 border-gray-300 rounded-md"
                        />
                    </div>

                    {/* Company */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Company..."
                            value={filters.company}
                            onChange={(e) => handleFilterChange('company', e.target.value)}
                            className="input w-full px-2 py-1 text-gray-600 border border-gray-300 rounded-md"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}