import React from 'react'
import PropTypes from 'prop-types'
import AdminLayout from '@/components/Layout/AdminLayout'
import DefaultList from '@/components/DefaultList'

const EmployeesPosition = props => {
  return (
    <AdminLayout>
        <DefaultList title='Cargos' />
    </AdminLayout>
  )
}

EmployeesPosition.propTypes = {}

export default EmployeesPosition