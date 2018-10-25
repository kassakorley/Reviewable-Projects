
const clientId = '1a5175359180458987358342e63a5f43'
const redirectURI = 'http://localhost:3000/';
let accessToken;
let ttl;

const url = 'https://api.spotify.com/v1/search?';
const base_url = 'https://api.spotify.com/v1/';
const type = '&type=album,track,artist'


const Spotify = {

        getAccessToken() {
          if (accessToken) {
            return new Promise(resolve => resolve(accessToken));
          }
          else {
            let temp = window.location.href.match(/access_token=([^&]*)/);
            if (temp) {
              accessToken = temp[1];
              temp = window.location.href.match(/expires_in=([^&]*)/);
              ttl = temp[1];
              window.setTimeout(() => accessToken = '', ttl * 1000);
              window.history.pushState('Access Token', null, '/');
            }
            else {
              const scope = 'user-read-private playlist-modify-public';
              const redirectUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectURI}&response_type=token&scope=playlist-modify-public`;
              window.location = redirectUrl;
            }
          }
        },

        search(term) {
          if (!accessToken) { Spotify.getAccessToken(); }
          const searchUrl = `${base_url}search?q=${term}&type=track,album,artist`;
          return fetch(searchUrl, {
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
              }
            }).then(response => response.json()).then(jsonResponse => {
              if (!jsonResponse.tracks) { return []; }
              return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
              }));
          });
        },

        savePlayList(name,trackURIs) {    
          if (!name || !trackURIs || trackURIs.length === 0) return;
          let playlist_id =null;
          let user_id =null;
          const useridUrl = `${base_url}me`;
          if (!accessToken) { Spotify.getAccessToken(); }
          const headers = {
            Authorization: `Bearer ${accessToken}`
          };
          fetch (useridUrl, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            },
          }).then (response => response.json()) 
          .then (jsonResponse => user_id = jsonResponse.id )
          .then (() => {
            const createplaylistUrl = `${base_url}users/${user_id}/playlists`;
            fetch (createplaylistUrl, {method:'POST',headers:headers,
              body:JSON.stringify({name:name})
            }).then (response=> response.json())
              .then (jsonResponse => playlist_id = jsonResponse.id)
              .then( () => {
                const addtracksUrl = `${base_url}playlists/${playlist_id}/tracks`;
                fetch (addtracksUrl, {
                  method: 'POST',
                  headers: headers,
                  body:JSON.stringify({"uris":trackURIs})
              })
            });
          });

      }
}

export default Spotify