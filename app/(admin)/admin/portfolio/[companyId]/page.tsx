import AdminIndiPortfolio from '@/app/components/AdminIndiPortfolio/AdminIndiPortfolio'
import DefaultLayout from '@/app/components/Layouts/DefaultLayout'
import React from 'react'

const page = () => {
  return (
    <DefaultLayout>
        <AdminIndiPortfolio editMode/>
    </DefaultLayout>
  )
}

export default page