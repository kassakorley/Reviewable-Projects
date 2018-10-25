//var for client ID
let ClientID = 'f661f333eb894da5a80183420858abb3'

//var for rediect url
let redirectURI = 'http://localhost:3000/'
//let redirectURI = 'https://danfortin2.github.io/jammingplaylists'

//empty object for user token
let UserToken;

//if access token doesnt exist then look for it check the current URL for the access token
let accessToken = window.location.href.match(/access_token=([^&]*)/);
let expiresTime = window.location.href.match(/expires_in=([^&]*)/);

//empty object for spotify info
let Spotify = {
  //create accesstoken method to see if token is already set
  getAccessToken() {
    //if access token exists then use it.
    if(UserToken) {
      return UserToken;
    //if access token and expiration time in the url
    } else if(accessToken && expiresTime) {
      //set the usertoken to the access token
      UserToken = accessToken[1];
      //set expiration time to expires variable
      let expires = Number(expiresTime[1]);
      //wipe token from url after expired
      window.setTimeout(() => UserToken = '', expires * 1000);
      window.history.pushState('UserToken', null, '/');
      return UserToken;
    } else {
      //redirect user to the authorization endpoint to get access token
      window.location = `https://accounts.spotify.com/authorize?client_id=${ClientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  },

  //create search method to pass to spotify
  search(term) {
    Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      //add authorization header wtih user access token
      headers: {
        Authorization: `Bearer ${UserToken}`
      }
    }).then(response => {
      if(response.ok) {
        return response.json();
      } else {
        console.log('search stopping here')
      }
    }).then(jsonResponse => {
      if(jsonResponse.tracks) {
        //tracks - items - object items beneath
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      } else {
        return []
      }
    });
  },

//create saveplaylist method that accepts a playlistname and an array of track uris
  savePlayList(playListName, trackURIs) {
    //check to see if there are values for playlist name or track uris if not return. Use length beause track uris is an array
    if (!playListName || !trackURIs.length) {
      return;
    } else {
      //create three variable for users token, another to hold the user token in the heard and empty variable for userid
      let newToken = Spotify.getAccessToken();
      let headers = {
        Authorization: `Bearer ${newToken}`
      };
      let userID;
    return fetch(`https://api.spotify.com/v1/me`,{headers: headers}).then(response => {
      if(response.ok) {
        return response.json()
      } else {
        console.log('saving playlist breaking here')
      }
      //send playlist name to user account
    }).then(jsonResponse => {
      userID = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({
          name: playListName
        })
      });
    }).then(response => {
      if(response.ok) {
        return response.json()
      } else {
        console.log('saving tracks breaks here')
      }
      //use playlist ID returned to send tracks
    }).then(jsonResponse => {
      let playlistId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistId}/tracks`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({
          uris: trackURIs
        })
      });
    })
    }
  }
}



export default Spotify;
