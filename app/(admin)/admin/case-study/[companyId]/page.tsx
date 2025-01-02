import AdminIndiCaseStudy from '@/app/components/AdminIndiCaseStudy/AdminIndiCaseStudy'
import DefaultLayout from '@/app/components/Layouts/DefaultLayout'
import React from 'react'

const page = () => {
  return (
    <DefaultLayout>
        <AdminIndiCaseStudy editMode/>
    </DefaultLayout>
  )
}

export default page