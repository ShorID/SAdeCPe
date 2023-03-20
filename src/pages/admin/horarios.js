import React from 'react'
import PropTypes from 'prop-types'
import AdminLayout from '@/components/Layout/AdminLayout'
import DefaultList from '@/components/DefaultList'

const Schedules = props => {
  return (
    <AdminLayout>
        <DefaultList title='Horarios' />
    </AdminLayout>
  )
}

Schedules.propTypes = {}

export default Schedules