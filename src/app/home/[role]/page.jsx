"use client"
import Sidebar from '@/app/components/Sidebar'
import React from 'react'
import { useParams } from 'next/navigation'

function page() {
  const {role} = useParams();
  return (
    <div>
        <Sidebar userRole={role} />
    </div>
  )
}

export default page