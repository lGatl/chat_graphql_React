import React from 'react'
import { Input } from 'semantic-ui-react'

const MyInput = (props) => {
	
	const onChange = (e) => {
		props.onChange({
			...props,
			value: e.target.value
		});
	}

	return <Input 
		{...props}
		onChange = {onChange} 

		placeholder={props.placeholder} />
}

export default MyInput

