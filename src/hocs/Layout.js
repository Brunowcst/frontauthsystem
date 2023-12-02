import React, { useEffect } from 'react'
import NavBar from '../components/Navbar'
import { connect } from 'react-redux'
import { check_authenticated, load_user } from '../actions/auth'

const Layout = (props) => {   
    useEffect(() => {
        props.check_authenticated();
        props.load_user()
    }, [])
    
    return (
        <div>
            <NavBar/>
            {props.children}
        </div>
    )
}

export default connect(null, {check_authenticated, load_user})(Layout)

