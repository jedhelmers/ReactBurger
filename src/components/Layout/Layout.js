import React from 'react'
import classes from './Layout.css'
import Aux from '../../hoc/Aux'

const layout = (props) => (
  // Aux is a higher order component HOC
  // they are used to render components WITHOUT
  // a parent div
  // HOCs can take Classes... I guess to style children
  // but if I don't like scoping CSS... is this really
  // neccessary?

  // HOCs can also be wrapped around export defaults
  <Aux>
    <div>
      Toolbar, SideDrawer, Backdrop
    </div>
    <main className="Content">
      {props.children}
    </main>
  </Aux>
)

export default layout
