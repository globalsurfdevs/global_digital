import React from 'react'
import DefaultLayout from '@/app/components/Layouts/DefaultLayout'
import AdminPortfolioChannel from '@/app/components/AdminPortfolioChannel/AdminPortfolioChannel'

const page = () => {
  return (
    <DefaultLayout>
        <AdminPortfolioChannel />
    </DefaultLayout>
  )
}

export default page