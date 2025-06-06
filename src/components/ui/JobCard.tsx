import { Job } from '@/types/job'
import { ArrowRight, Building2, IndianRupee, MapIcon, PinIcon, TypeIcon, WorkflowIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'

const JobCard = ({ jobs }: { jobs: Job[] }) => {
    const router = useRouter();
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) return '1 day ago';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
        return `${Math.ceil(diffDays / 30)} months ago`;
    };
    const handleJobClick = (jobId: string) => {
        router.push(`/jobs/${jobId}`);
    };
    console.log(jobs)
    return (
        <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5"
        >
            {
                jobs?.length === 0 ? <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No jobs found.</p>
                </div> :
                    jobs.map((job) => (
                        <div key={job.id} className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border border-gray-200 hover:border-blue-300 " onClick={() => { handleJobClick(job.id) }}>
                            <div className='mb-2 flex justify-between items-center '>
                                <h2 className="text-lg font-semibold text-gray-800">{job.title}</h2>
                                <p className="text-gray-600">{formatDate(job.postedDate)}</p>
                            </div>
                            <div className="flex items-center text-gray-600 mb-2">
                                <Building2 className="w-4 h-4 mr-2" />
                                <span className="font-medium">{job.company}</span>
                            </div>
                            <div className="flex items-center text-gray-600 mb-2">
                                <MapIcon className="w-4 h-4 mr-2" />
                                <span className="font-medium text-sm">{job.location}</span>
                            </div>
                            <div className="flex items-center text-gray-600 mb-2">
                                <WorkflowIcon className="w-4 h-4 mr-2" />
                                <p className="text-gray-600">{job.type}</p>
                            </div>
                            <p className="text-gray-400  text-sm mb-2">{job.description.slice(0, 100) + "..."}</p>
                            <div className="text-gray-600 flex flex-wrap">{job.requirements.map((req, index) => <p className='mr-2 bg-gray-100 px-2 py-1 rounded text-xs mb-2 mt-1' key={index}>{req}</p>)}</div>
                            <div className="flex items-center justify-between text-gray-600 mb-2">
                                <div className="text-gray-600 flex items-center text-sm mt-2"><IndianRupee className="w-4 h-4 mr-2" /> <p>{job.salary}</p></div>
                                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                            </div>
                        </div>
                    ))
            }
        </div>
    )
}

export default JobCard