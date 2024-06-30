import { useState, forwardRef, useImperativeHandle } from "react";


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

  return (
    <div>
        <button style={hideWhenVisible} onClick={toggleVisibility}>{props.buttonLabel}</button>
        <button style={showWhenVisible} onClick={toggleVisibility}>{props.buttonCloseLabel || "cancel"}</button>
      <div style={showWhenVisible}>
        {props.children}
      </div>
    </div>
  )
})

export default Togglable