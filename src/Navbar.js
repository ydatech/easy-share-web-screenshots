import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton'
/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */


import './Navbar.css'
const Navbar = (props) => {
    const { router, isLoggedIn } = props
    return (
        <div className="NavbarContainer">
            <AppBar
                style={{ maxWidth: 1200, boxShadow: false, paddingLeft: 0, paddingRight: 0 }}
                //titleStyle={{ flex: '0 1 auto' }}
                //iconStyleLeft={{ marginLeft: -75 }}
                //iconElementLeft={<IconButton onTouchTap={handleToggle}><NavigationMenu /></IconButton>}
                iconElementRight={isLoggedIn ? <FlatButton label="Published Screenshots" /> : <FlatButton label=" " />}
                title="Easy Share Web Screenshots"
                showMenuIconButton={false}
                onTitleTouchTap={(e) => {

                    router.push('/')
                }}
                onRightIconButtonTouchTap={(e) => {
                    if (isLoggedIn) {
                        router.push('published')
                    }
                }}
                titleStyle={{ cursor: 'pointer' }}
            />
        </div>

    )
}

export default Navbar;