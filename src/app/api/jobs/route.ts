import { NextRequest, NextResponse } from 'next/server';
import { Job, JobFormData } from '@/types/job';
import { jobs } from '@/data/data';

// Mock database - in a real app, this would be a database


export async function GET() {
    return NextResponse.json(jobs);
}

export async function POST(request: NextRequest) {
    try {
        const jobData: JobFormData = await request.json();
        if (!jobData.title || !jobData.company || !jobData.location || !jobData.type || !jobData.description) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const newJob: Job = {
            id: (jobs.length + 1).toString(),
            title: jobData.title,
            company: jobData.company,
            location: jobData.location,
            type: jobData.type,
            description: jobData.description,
            requirements: jobData.requirements ? jobData.requirements.split('\n').filter(req => req.trim()) : [],
            salary: jobData.salary,
            postedDate: new Date().toISOString(),
            applicationUrl: jobData.applicationUrl
        };

        jobs.unshift(newJob);
        return NextResponse.json(newJob, { status: 201 });
    } catch (error) {
        console.log(error);

        return NextResponse.json(
            { error: `Failed to create job${error}` },
            { status: 500 }
        );
    }
}