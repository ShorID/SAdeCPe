import React from 'react'
import PropTypes from 'prop-types'
import AdminLayout from '@/components/Layout/AdminLayout'
import DefaultList from '@/components/DefaultList'

const TrainingCenters = props => {
  return (
    <AdminLayout>
        <DefaultList title='Centros de capacitacion' />
    </AdminLayout>
  )
}

TrainingCenters.propTypes = {}

export default TrainingCenters