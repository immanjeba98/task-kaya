
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { JobFormData } from '@/types/job';
import { useJobs } from '@/contexts/JobContext';
import { Loader2, ArrowLeft } from 'lucide-react';

export default function JobForm() {
  const router = useRouter();
  const { addJob, state: { loading } } = useJobs();
  
  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    company: '',
    location: '',
    type: 'full-time',
    description: '',
    requirements: '',
    salary: '',
    applicationUrl: '',
  });
  
  const [errors, setErrors] = useState<any>({});

  const validateForm = (): boolean => {
    const newErrors: any = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Job title is required';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Job description is required';
    } else if (formData.description.length < 50) {
      newErrors.description = 'Description must be at least 50 characters';
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await addJob(formData);
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev:any) => ({ ...prev, [name]: '' }));
    }
  };

  const inputClasses = "w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors";
  const errorInputClasses = "border-red-300 focus:ring-red-500 focus:border-red-500";

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Jobs
      </button>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Job</h1>
          <p className="text-gray-600 mb-8">Fill out the form below to post a new job listing.</p>
         

          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Job Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`${inputClasses} ${errors.title ? errorInputClasses : ''}`}
                placeholder="e.g. Senior Frontend Developer"
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            {/* Company */}
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                Company *
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={`${inputClasses} ${errors.company ? errorInputClasses : ''}`}
                placeholder="e.g. Exchange data."
              />
              {errors.company && (
                <p className="mt-2 text-sm text-red-600">{errors.company}</p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={`${inputClasses} ${errors.location ? errorInputClasses : ''}`}
                  placeholder="e.g. Chennai, India"
                />
                {errors.location && (
                  <p className="mt-2 text-sm text-red-600">{errors.location}</p>
                )}
              </div>

              {/* Job Type */}
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                  Job Type *
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className={inputClasses}
                >
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="contract">Contract</option>
                  <option value="remote">Remote</option>
                </select>
              </div>
            </div>

            {/* Salary */}
            <div>
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-2">
                Salary (Optional)
              </label>
              <input
                type="text"
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className={inputClasses}
                placeholder="e.g. 8LPA - 12LPA"
              />
              <p className="mt-1 text-sm text-gray-500">
                Include salary range or hourly rate if applicable
              </p>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Job Description *
              </label>
              <textarea
                id="description"
                name="description"
                rows={6}
                value={formData.description}
                onChange={handleChange}
                className={`${inputClasses} resize-vertical ${errors.description ? errorInputClasses : ''}`}
                placeholder="Describe the role, responsibilities, requirements, and what you're looking for in a candidate..."
              />
              <div className="flex justify-between items-center mt-1">
                <p className="text-sm text-gray-500">
                  {formData.description.length}/50 characters minimum
                </p>
                <p className="text-sm text-gray-400">
                  {formData.description.length} characters
                </p>
              </div>
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
            </div>

            {/* Requirements */}
            <div>
              <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-2">
                Requirements (Optional)
              </label>
              <textarea
                id="requirements"
                name="requirements"
                rows={4}
                value={formData.requirements}
                onChange={handleChange}
                className={`${inputClasses} resize-vertical`}
                placeholder="Add any other requirements here..."
              />
              <p className="mt-1 text-sm text-gray-500">
                Enter each requirement on a separate line. Use bullet points or numbers for better formatting.
              </p>
            </div>

            {/* Application URL */}
            <div>
              <label htmlFor="applicationUrl" className="block text-sm font-medium text-gray-700 mb-2">
                Application URL (Optional)
              </label>
              <input
                type="url"
                id="applicationUrl"
                name="applicationUrl"
                value={formData.applicationUrl}
                onChange={handleChange}
                className={`${inputClasses} ${errors.applicationUrl ? errorInputClasses : ''}`}
                placeholder="https://company.com/apply"
              />
              <p className="mt-1 text-sm text-gray-500">
                External link where candidates can apply for this position
              </p>
              {errors.applicationUrl && (
                <p className="mt-1 text-sm text-red-600">{errors.applicationUrl}</p>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="w-full sm:w-auto px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 flex items-center justify-center"
              disabled={loading}
            >
              {loading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
              {loading ? 'Adding Job...' : 'Add Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}