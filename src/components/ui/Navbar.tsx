'use client';
import { Briefcase, Home, Plus } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

const Navbar = () => {
    const pathname = usePathname();

    const navItems = [
        { href: '/', label: 'Job Listings', icon: Home },
        { href: '/add-job', label: 'Add Job', icon: Plus },
    ];
    return (
        <nav className='bg-white shadow-sm border-b border-gray-100'>
            <div className='"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <Briefcase className="h-8 w-8 text-blue-600" />
                            <span className="text-xl font-bold text-gray-900">JobBoard</span>
                        </Link>
                    </div>
                    <div className='flex gap-4'>
                        {
                            navItems.map((item) => (
                                <Link href={item.href} key={item.href} className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname === item.href ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>
                                    <item.icon className="h-6 w-6" />
                                    <span className="text-sm font-medium">{item.label}</span>
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar