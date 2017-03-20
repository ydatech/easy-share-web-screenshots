import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
//import './NotFound.css'
import CircularProgress from 'material-ui/CircularProgress';
import './Published.css';
import FlatButton from 'material-ui/FlatButton';

export default class Published extends Component {
    componentDidMount() {
        const { loadPublishedScreenshots, isLoggedIn } = this.props
        if (isLoggedIn)
            loadPublishedScreenshots()
    }

    render() {
        const { publishedScreenshots, isFetchingPublished, router } = this.props

        return (
            <div className="Published">
                <h1> Published Screenshots</h1>
                <div className="PublishedItems">

                    {isFetchingPublished && <div style={{ textAlign: 'center' }}><CircularProgress /> </div>}
                    {
                        publishedScreenshots.map((item) => {
                            let d = new Date(item.created_time)
                            return (
                                <Paper key={item.id} style={{ padding: 20, marginBottom: 50, width: 764 }}>
                                    <div style={{ textAlign: 'right' }}>
                                        <a target="_blank" style={{ textDecoration: 'none' }} href={item.permalink_url}> <i className="fa fa-facebook"></i> See Post On Facebook</a>
                                    </div>
                                    <p>{item.message}</p>
                                    <div style={{ textAlign: 'center', border: '2px solid rgba(0, 0, 0, .1)' }}>
                                        <img src={item.full_picture} alt={item.message} />
                                    </div>
                                    <div style={{ borderTop: "2px solid rgba(0, 0, 0, .1)" }}>
                                        <p>Published on {d.toDateString()} at {d.toTimeString()}</p>
                                    </div>
                                </Paper>
                            )
                        })
                    }
                    {publishedScreenshots.length < 1 &&
                        <Paper style={{ padding: 20, marginBottom: 50, width: 764, textAlign: 'center' }} >
                            <h3> You do not have any publihed screenshots yet! </h3>
                            <FlatButton primary={true} label="Publish New Screenshots" onTouchTap={() => {
                                router.push('/')
                            }} />
                        </Paper>
                    }

                </div>
            </div>
        )
    }
}