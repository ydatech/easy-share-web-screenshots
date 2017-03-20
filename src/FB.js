
let FB = window.FB

//console.log(FB)


export const init = () => {

    return new Promise((resolve, reject) => {
        if (typeof FB !== 'undefined') {
            resolve('already intialized')
        } else {

            window.fbAsyncInit = function () {
                FB = window.FB
                FB.init({
                    appId: '1930089280596101',
                    xfbml: true,
                    version: 'v2.8',

                    cookie: true

                });
                FB.AppEvents.logPageView();

                resolve('initialized')
            };

            (function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) { return; }
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        }
    })
}
export const getLoginStatus = () => {

    return new Promise((resolve, reject) => {
        FB.getLoginStatus((response) => {

            if (response.status === 'connected') {
                resolve(response)
            }
            else {
                reject(response)

            }
        });

    })
}

export const login = () => {
    return new Promise((resolve, reject) => {

        FB.login((response) => {

            if (response.status === 'connected') {
                resolve(response)
            } else {
                reject(response)
            }
        }, { scope: "email,publish_actions,user_posts" })
    })
}
export const logout = () => {
    return new Promise((resolve, reject) => {

        FB.logout((response) => {
            resolve(response)

        })
    })
}

export const api = (path, method = 'get', params) => {

    return new Promise((resolve, reject) => {
        const callback = (response) => {

            resolve(response)
        }
        FB.api(path, method, params, callback)
    })
}


export default { init, getLoginStatus, login, logout }