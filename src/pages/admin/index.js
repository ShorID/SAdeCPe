import React from 'react'
import AdminLayout from '@/components/Layout/AdminLayout'
import TrainingList from '@/components/TrainingList'

const Admin = props => {
  return (
    <AdminLayout>
        <TrainingList />
    </AdminLayout>
  )
}

Admin.propTypes = {}

export default Admin