import React from 'react'
import PropTypes from 'prop-types'
import AdminLayout from '@/components/Layout/AdminLayout'
import DefaultList from '@/components/DefaultList'

const Trainers = props => {
  return (
    <AdminLayout>
        <DefaultList title='Capacitadores' />
    </AdminLayout>
  )
}

Trainers.propTypes = {}

export default Trainers