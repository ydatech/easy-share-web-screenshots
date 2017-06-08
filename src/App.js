import React, { Component } from 'react';
import './App.css';

import * as FB from './FB'

// Themeing/Styling
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import theme from './theme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import axios from 'axios'
// Components
import SuccessDialog from './SuccessDialog'
import Navbar from './Navbar'

// Tap Plugin
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

class App extends Component {
  state = {
    isLoggedIn: false,
    isFetching: false,
    isPosting: false,
    user: {},
    formData: {
      url: '',
      errorUrl: '',
      mode: 'desktop'
    },
    postData: {
      url: '',
      caption: ''
    },
    postId: '',
    timelineAlbumId: null,
    fbPost: {},
    shouldOpenDialog: false,
    publishedScreenshots: [],
    isFetchingPublished: false
  }
  componentDidMount() {

    FB.init().then((r) => {
      FB.getLoginStatus().then((response) => {

        this.me()
        this.loadPublishedScreenshots()
        this.setState({ isLoggedIn: true })

      }, (response) => {

        this.setState({ isLoggedIn: false })
      })

    })

    //axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'https://api.grafy.io' : 'http://localhost:8800';
    axios.defaults.baseURL = 'https://api.grafy.io';
  }

  login = (e) => {

    FB.login().then((response) => {
      this.me()
      this.setState({ isLoggedIn: true })

    }).catch((response) => {
      this.setState({ isLoggedIn: false })
    })
  }

  logout = (e) => {

    FB.logout().then((response) => {
      this.setState({ isLoggedIn: false })
    })
  }

  me = () => {

    //console.log('me')
    FB.api('/me', 'get', { fields: 'id,name,picture,albums.limit(100){id,type,name}' }).then((response) => {


      if (response.id) {
        this.setState({ user: { ...response } })

        if (response.albums && response.albums.data) {
          let timelineAlbum = response.albums.data.find((album) => {
            return album.type === 'wall';
          })
          if (timelineAlbum) {
            this.setState({ timelineAlbumId: timelineAlbum.id })
          }

        }
      }

    })
  }
  updateAppState = (stateData) => this.setState({ ...stateData })

  getTheScreenshot = () => {
    const { url, mode } = this.state.formData
    this.setState({ isFetching: true })
    axios.get('/image/capture', {
      params: {
        url: url,
        mode: mode,
        fid: this.state.user.id
      }
    }).then((response) => {
      if (response.data.success)
        this.setState({ isFetching: false, postData: { ...this.state.postData, ...{ url: `${response.data.data.url}?v=${Date.now()}` } } })
      else
        this.setState({ isFetching: false })


    })
      .catch((error) => {
        this.setState({ isFetching: false })


      });
  }

  postToFacebook = () => {
    this.setState({ isPosting: true })
    let url = `${this.state.user.id}/photos`
    if (this.state.timelineAlbumId) {
      url = `${this.state.timelineAlbumId}/photos`
    }
    FB.api(url, 'post', { ...this.state.postData }).then((response) => {
      let post = response
      FB.api(`${post.id}`, 'get', { fields: 'id,link,created_time' }).then((response) => {
        this.setState({ fbPost: response, isPosting: false, postId: post.post_id, shouldOpenDialog: true })
      })
    }).catch((error) => {

      this.setState({ isPosting: false })
    })
  }

  loadPublishedScreenshots = () => {
    this.setState({ isFetchingPublished: true })
    FB.api('me/feed', 'get', { fields: 'message,created_time,permalink_url,link,application,full_picture', limit: 100 }).then((response) => {

      let publishedScreenshots = response.data.filter((item, index) => {
        if (item.application) {
          return item.application.id === window.FBConfig.appId
        } else {
          return false;
        }
      })

      this.setState({ isFetchingPublished: false, publishedScreenshots: publishedScreenshots })
    }).catch((error) => {
      this.setState({ isFetchingPublished: false })
    })
  }


  render() {


    return (
      <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
        <div className="App">
          <Navbar router={this.props.router} isLoggedIn={this.state.isLoggedIn} />
          <div className="AppContent">
            {
              React.cloneElement(this.props.children, {
                isLoggedIn: this.state.isLoggedIn,
                user: this.state.user,
                login: this.login,
                logout: this.logout,
                updateAppState: this.updateAppState,
                formData: this.state.formData,
                postData: this.state.postData,
                isFetching: this.state.isFetching,
                getTheScreenshot: this.getTheScreenshot,
                postToFacebook: this.postToFacebook,
                isPosting: this.state.isPosting,
                loadPublishedScreenshots: this.loadPublishedScreenshots,
                publishedScreenshots: this.state.publishedScreenshots,
                isFetchingPublished: this.state.isFetchingPublished
              })
            }
          </div>
          <SuccessDialog
            shouldOpenDialog={this.state.shouldOpenDialog}
            postId={this.state.postId}
            fbPost={this.state.fbPost}
            updateAppState={this.updateAppState}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
