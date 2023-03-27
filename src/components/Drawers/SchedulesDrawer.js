import React from 'react'
import PropTypes from 'prop-types'
import Drawer from '.'
import CustomInput from '../CustomInput'

const SchedulesDrawer = props => {
  return (
    <Drawer>
        <CustomInput label="Titulo" />
        <CustomInput label="Descripcion" />
        <CustomInput label="Fecha de creacion" />
    </Drawer>
  )
}

SchedulesDrawer.propTypes = {}

export default SchedulesDrawer