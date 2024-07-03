import React, {useEffect} from 'react'

export const Checkbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
	const defaultRef = React.useRef()
	const resolvedRef = ref || defaultRef

	useEffect(() => {
		resolvedRef.current.indeterminate = indeterminate
	}, [resolvedRef, indeterminate])

	return (
		<>
			<input type='checkbox' className="checkbox" ref={resolvedRef} {...rest} />
		</>
	)
})