import React, { Component } from 'react'
import Paper from 'material-ui/Paper';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import placeholder from './placeholder.png'
import Avatar from 'material-ui/Avatar';
import isURL from 'validator/lib/isURL';
import LinearProgress from 'material-ui/LinearProgress';
import './Home.css'
import FlatButton from 'material-ui/FlatButton';

import { Link } from 'react-router'
export default class Home extends Component {

    render() {


        const { isLoggedIn,
            user,
            login,
            logout,
            formData,
            updateAppState,
            postData,
            isFetching,
            getTheScreenshot,
            postToFacebook,
            isPosting
         } = this.props

        let previewStyle = { maxWidth: 510 }

        if (formData.mode === 'mobile') {
            previewStyle = { maxWidth: 320 }
        }
        else if (formData.mode === 'tablet') {
            previewStyle = { maxWidth: 400 }
        }
        return (
            <div className="Home">

                <Paper style={{ width: 320, minHeight: 400, padding: 20, display: 'flex', flexFlow: 'column nowrap' }}>
                    <div className="Header">
                        {isLoggedIn ? <h3>1. You are logged in as: </h3> : <h3>1. Login</h3>}
                    </div>
                    {isLoggedIn && user.picture ?
                        <div className="LoginButton" style={{ textAlign: 'center', lineHeight: '6px' }}>
                            <Avatar src={user.picture.data.url} />
                            <p> {user.name}</p>
                            <p> <FlatButton labelStyle={{ textTransform: 'none' }} label="Logout" primary={true} onTouchTap={() => logout()} /></p>
                        </div>
                        :
                        <div className="LoginButton">
                            <RaisedButton
                                onTouchTap={() => { login() }}
                                label="Login With Facebook"
                                primary={true}
                                //style={styles.button}
                                icon={<FontIcon className="fa fa-facebook" />}
                            />
                        </div>
                    }
                    <div className="Header">
                        <h3> 2. Input a target URL</h3>
                    </div>
                    <div>
                        <TextField
                            hintText="https://github.com"
                            // floatingLabelText="Input a target URL"
                            //floatingLabelFixed={true}
                            value={formData.url}
                            onChange={(e) => {
                                let errorUrl = 'Invalid URL'
                                if (isURL(e.target.value, { protocols: ['http', 'https'] }))
                                    errorUrl = ''
                                updateAppState({ formData: { ...formData, ...{ url: e.target.value, errorUrl: errorUrl } } })
                            }}
                            errorText={formData.errorUrl}
                            disabled={!isLoggedIn || isFetching || isPosting}
                            type="url"
                        />
                    </div>
                    <div className="Header">
                        <h3>3. Choose Screen Type</h3>
                    </div>
                    <div>
                        <RadioButtonGroup
                            onChange={(e, value) => {
                                updateAppState({ formData: { ...formData, ...{ mode: value } } })
                            }}
                            name="shipSpeed"
                            valueSelected={formData.mode}
                            style={{ display: 'flex', justifyContent: 'center', flexFlow: 'column nowrap' }}
                        >

                            <RadioButton
                                value="desktop"
                                label="Desktop"
                                disabled={!isLoggedIn || isFetching || isPosting || formData.url.length < 1 || formData.errorUrl === 'Invalid URL'}
                                style={{ marginBottom: 16 }}
                            />
                            <RadioButton
                                value="tablet"
                                label="Tablet"
                                disabled={!isLoggedIn || isFetching || isPosting || formData.url.length < 1 || formData.errorUrl === 'Invalid URL'}
                                style={{ marginBottom: 16 }}
                            />
                            <RadioButton
                                value="mobile"
                                label="Mobile"
                                disabled={!isLoggedIn || isFetching || isPosting || formData.url.length < 1 || formData.errorUrl === 'Invalid URL'}
                                style={{ marginBottom: 16 }}

                            />
                        </RadioButtonGroup>
                    </div>
                    <div className="Header">
                        <h3>4. Get The Screenshot</h3>
                    </div>
                    <div>
                        <RaisedButton
                            onTouchTap={() => { getTheScreenshot() }}
                            label="Get Screenshot"
                            //primary={true}
                            //style={styles.button}
                            disabled={!isLoggedIn || isPosting || formData.url.length < 1 || formData.errorUrl === 'Invalid URL' || isFetching}
                            icon={<FontIcon className="fa fa-download" />}
                        />
                    </div>
                </Paper>
                <Paper style={{ width: 550, minHeight: 400, padding: 20, display: 'flex', flexFlow: 'column nowrap' }}>
                    <div className="Header">
                        <h3>5. Screenshot Preview </h3>
                    </div>
                    <div >
                        {isFetching && <div style={{ marginBottom: '10px' }}>
                            <LinearProgress mode="indeterminate" />
                        </div>}
                        <div style={{ textAlign: 'center' }}>
                            <img src={postData.url ? postData.url : placeholder} alt="preview" style={previewStyle} />
                        </div>

                    </div>
                </Paper>
                <Paper style={{ width: 320, minHeight: 400, padding: 20 }}>
                    <div className="Header">
                        <h3>6. Write Caption</h3>
                    </div>
                    <div>
                        <TextField
                            hintText="Write something"
                            // floatingLabelText="Input a target URL"
                            //floatingLabelFixed={true}
                            value={postData.caption}
                            onChange={(e) => {

                                updateAppState({ postData: { ...postData, ...{ caption: e.target.value } } })
                            }}
                            multiLine={true}
                            rows={1}
                            rowsMax={6}
                            disabled={!isLoggedIn || postData.url.length < 1 || isFetching || isPosting}

                        />
                    </div>
                    <div className="Header">
                        <h3>7. Post To Facebook</h3>
                    </div>
                    <div>
                        <RaisedButton
                            onTouchTap={() => { postToFacebook() }}
                            label={isPosting ? "Sending To Facebook" : "Post To Facebook"}
                            primary={true}
                            //style={styles.button}
                            icon={<FontIcon className={isPosting ? "fa fa-spinner fa-spin" : "fa fa-paper-plane"} />}
                            disabled={!isLoggedIn || postData.url.length < 1 || postData.caption.length < 1 || isFetching || isPosting}
                        />
                    </div>
                    <div style={{ marginTop: 80 }}>
                        <h3>About This Website</h3>
                    </div>
                    <div>
                        <p> Easy Share Web Screenshots (ESWS) is the easiest way to share website screenshots to your Facebook account. While using this site, you agree to have read and accepted our <Link to="/tos">terms of use</Link>, and <Link to="/pp">privacy policy</Link>. Copyright 2017 by {location.hostname}. All Rights Reserved.</p>
                        <p> Powered By React.js</p>
                    </div>
                </Paper>
            </div>
        )


    }
}