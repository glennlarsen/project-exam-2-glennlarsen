import React from 'react'
import { Link, animateScroll as scroll } from "react-scroll";

const Button = ({ children, to, type, onClick }) => (
    <Link onClick={onClick} to={to} className={`btn ${type}`} smooth={true} duration={500} offset={-70}>
        {children}
    </Link>
)

export default Button;