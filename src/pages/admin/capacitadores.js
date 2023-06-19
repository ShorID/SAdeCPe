import React from 'react'
import PropTypes from 'prop-types'
import AdminLayout from '@/components/Layout/AdminLayout'
import DefaultList from '@/components/DefaultList'
import withAuthValidation from '@/hocs/withAuthValidation'

const Trainers = props => {
  return (
    <AdminLayout>
        <DefaultList title='Capacitadores' endpoint='/trainer' listId='trainer' />
    </AdminLayout>
  )
}

Trainers.propTypes = {}

export default withAuthValidation(Trainers)