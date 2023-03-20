import React from 'react'
import PropTypes from 'prop-types'
import AdminLayout from '@/components/Layout/AdminLayout'
import DefaultList from '@/components/DefaultList'

const Organizations = props => {
  return (
    <AdminLayout>
        <DefaultList title='Organizaciones' />
    </AdminLayout>
  )
}

Organizations.propTypes = {}

export default Organizations