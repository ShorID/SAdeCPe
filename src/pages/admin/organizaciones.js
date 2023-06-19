import React from 'react'
import PropTypes from 'prop-types'
import AdminLayout from '@/components/Layout/AdminLayout'
import DefaultList from '@/components/DefaultList'
import withAuthValidation from '@/hocs/withAuthValidation'

const Organizations = props => {
  return (
    <AdminLayout>
        <DefaultList title='Organizaciones' endpoint='/org' listId='org' withoutFilters />
    </AdminLayout>
  )
}

Organizations.propTypes = {}

export default withAuthValidation(Organizations)