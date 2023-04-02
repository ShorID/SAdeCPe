import React from 'react'
import PropTypes from 'prop-types'
import AdminLayout from '@/components/Layout/AdminLayout'
import DefaultList from '@/components/DefaultList'

const Employees = props => {
  return (
    <AdminLayout>
        <DefaultList title='Empleados' />
    </AdminLayout>
  )
}

Employees.propTypes = {}

export default Employees