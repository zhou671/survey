import PropTypes from 'prop-types'

const Button = ({text, onClick}) => {
    return (
            <button onClick = {onClick} id='login-form-submit'>
                {text}
            </button>
    )
}

Button.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func.isRequired,
}

export default Button
