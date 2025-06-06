'use client';

import { useJobs } from '@/contexts/JobContext';
import { useParams, useRouter } from 'next/navigation';
import { MapPin, Building, Calendar, Clock, ArrowLeft, ExternalLink, IndianRupeeIcon } from 'lucide-react';

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { getJobById, state } = useJobs();
  
  const jobId = params.id as string;
  const job = getJobById(jobId);

  if (state.loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading job details...</div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
          <p className="text-gray-600 mb-6">The job you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };



  const handleApply = () => {
    if (job.applicationUrl) {
      window.open(job.applicationUrl, '_blank');
    } else {
      alert('Application URL not available for this job.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Jobs
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-600 text-white p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
              <div className="flex items-center text-blue-100 mb-2">
                <Building className="h-5 w-5 mr-2" />
                <span className="text-lg">{job.company}</span>
              </div>
              <div className="flex items-center text-blue-100">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{job.location}</span>
              </div>
            </div>
            <div className="flex flex-col items-start md:items-end space-y-3">
              <span className={`px-4 py-2 rounded-full text-sm font-medium bg-white bg-opacity-20 text-blue-400`}>
                {job.type.charAt(0).toUpperCase() + job.type.slice(1).replace('-', ' ')}
              </span>
              {job.salary && (
                <div className="flex items-center text-blue-100">
                  <IndianRupeeIcon className="h-5 w-5 mr-1" />
                  <span className="text-lg font-semibold">{job.salary}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {job.description}
                  </p>
                </div>
              </section>

              {/* Requirements */}
              {job.requirements && job.requirements.length > 0 && (
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
                  <ul className="space-y-2">
                    {job.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Details</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Posted</p>
                      <p className="font-medium">{formatDate(job.postedDate)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Job Type</p>
                      <p className="font-medium capitalize">{job.type.replace('-', ' ')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{job.location}</p>
                    </div>
                  </div>
                  
                  {job.salary && (
                    <div className="flex items-center text-gray-600">
                      <IndianRupeeIcon className="h-5 w-5 mr-3" />
                      <div>
                        <p className="text-sm text-gray-500">Salary</p>
                        <p className="font-medium text-green-600">{job.salary}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Apply Button */}
                <button
                  onClick={handleApply}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
                >
                  Apply Now
                  <ExternalLink className="h-4 w-4 ml-2" />
                </button>
                
                <p className="text-xs text-gray-500 mt-2 text-center">
                  You&aposll be redirected to the company&apos;s application page
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}       