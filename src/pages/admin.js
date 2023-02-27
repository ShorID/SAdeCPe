import React from 'react'
import PropTypes from 'prop-types'
import AdminLayout from '@/components/Layout/AdminLayout'
import TitleBlock from '@/components/TitleBlock'
import CustomInput from '@/components/CustomInput'
import TrainingList from '@/components/TrainingList'

const Admin = props => {
  return (
    <AdminLayout>
        <TitleBlock title='Buscar Capacitaciones' className="mt-0 mb-2" />
        <CustomInput label='Nombre' type='search' variant='group' />
        <TrainingList />
    </AdminLayout>
  )
}

Admin.propTypes = {}

export default Admin