import React from 'react'
import { Segment } from 'semantic-ui-react'

const MySegment = (props) => {
	
	const onClick = (e) => {
		props.onClick({
			...props,
			value: e.target.value
		});
	}

	return <Segment 
		{...props}
		onClick = {onClick} 
		 />
}

export default MySegment

