import PropTypes from 'prop-types'

const Button = ({text, onClick}) => {
    return (
        <button
            onClick = {onClick}
            className='btn'
        >
            {text}
        </button>
    )
}

Button.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func.isRequired,
}

export default Button
