import React from 'react'
import PropTypes from 'prop-types'
import AdminLayout from '@/components/Layout/AdminLayout'
import DefaultList from '@/components/DefaultList'

const States = props => {
  return (
    <AdminLayout>
        <DefaultList title='Estados' />
    </AdminLayout>
  )
}

States.propTypes = {}

export default States