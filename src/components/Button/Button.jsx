import { Link } from 'react-router-dom'
import './Button.css'

function Button({ to, children, variant = 'primary', className = '', type = 'button', ...props }) {
    const classes = `rental-button rental-button--${variant} ${className}`
    return to
        ? <Link to={to} className={classes} {...props}>{children}</Link>
        : <button type={type} className={classes} {...props}>{children}</button>
}

export default Button
