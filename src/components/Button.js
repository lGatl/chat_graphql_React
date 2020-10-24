import React from 'react'
import { Button } from 'semantic-ui-react'

const MyButton = (props) => <Button type={props.type}>{props.children}</Button>

export default MyButton
