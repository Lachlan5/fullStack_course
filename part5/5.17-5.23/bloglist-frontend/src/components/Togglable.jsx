import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisable] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisable(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  return (
    <div>
      <button style={hideWhenVisible} onClick={toggleVisibility}>{props.buttonLabel}</button>
      <button style={showWhenVisible} onClick={toggleVisibility}>{props.buttonCloseLabel || 'cancel'}</button>
      <div style={showWhenVisible} className='togglable'>
        {props.children}
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable