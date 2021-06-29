import axios from "axios";
import scopes from "./scopes";
import {
  AUTH_URL,
  REFRESH_URL,
  CLIENT_SECRET,
  CLIENT_ID,
  URI,
} from "./_consts";

export const url_auth =
  AUTH_URL +
  "?client_id=" +
  CLIENT_ID +
  "&redirect_uri=" +
  URI +
  "&response_type=token" +
  "&scope=" +
  scopes.join("%20");

export const getUriRefresh: (access_token: string) => string = (
  access_token: string
) => {
  return (
    REFRESH_URL +
    "?grant_type=authorization_code&" +
    "code=" +
    access_token +
    "&redirect_uri=http://localhost:3000" +
    "&client_id=" +
    CLIENT_ID +
    "&client_secret=" +
    CLIENT_SECRET
  );
};

export const getToken = () => {
  let substring = window.location.hash.substring(1);
  let subs = substring.split("&");
  const access_token = subs[0]?.split("=")[1] || "";
  const type = subs[1]?.split("=")[1];
  const expire_in = subs[2]?.split("=")[1] || 0;
  return { access_token, type, expire_in };
};

class SpotifyAPI {
  public access_token: string = "";
  public refresh_token: string = "";
  constructor() {}

  setToken(access_token: string) {
    this.access_token = access_token;
  }

  async getRecentlyPlayedTracks() {
    const res = await axios.get(
      "https://api.spotify.com/v1/me/player/recently-played",
      {
        headers: {
          Authorization: "Bearer " + this.access_token,
          Accept: "application/json",
        },
      }
    );

    return res.data;
  }

  async getProfile() {
    const res = await axios.get("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + this.access_token,
        Accept: "application/json",
      },
    });

    return res.data;
  }

  async getNewReleaseTracks() {
    const res = await axios.get(
      "https://api.spotify.com/v1/browse/new-releases",
      {
        headers: {
          Authorization: "Bearer " + this.access_token,
          Accept: "application/json",
        },
      }
    );

    return res.data;
  }

  async getAPlaylist(playlist_id: string) {
    const res = await axios.get(
      "https://api.spotify.com/v1/playlists/" + playlist_id,
      {
        headers: {
          Authorization: "Bearer " + this.access_token,
          Accept: "application/json",
        },
      }
    );

    return res.data;
  }

  async getAAlbum(album_id: string) {
    const res = await axios.get(
      "https://api.spotify.com/v1/albums/" + album_id,
      {
        headers: {
          Authorization: "Bearer " + this.access_token,
          Accept: "application/json",
        },
      }
    );

    return res.data;
  }

  async getFuturedPlaylists() {
    const res = await axios.get(
      "https://api.spotify.com/v1/browse/featured-playlists",
      {
        headers: {
          Authorization: "Bearer " + this.access_token,
          Accept: "application/json",
        },
      }
    );

    return res.data;
  }

  async getArtistProfile(artist_id: string) {
    const res = await axios.get(
      "https://api.spotify.com/v1/artists/" + artist_id,
      {
        headers: {
          Authorization: "Bearer " + this.access_token,
          Accept: "application/json",
        },
      }
    );

    return res.data;
  }

  async getArtistTopTracks(artist_id: string) {
    const res = await axios.get(
      "https://api.spotify.com/v1/artists/" +
        artist_id +
        "/top-tracks?market=VN",
      {
        headers: {
          Authorization: "Bearer " + this.access_token,
          Accept: "application/json",
        },
      }
    );

    return res.data;
  }

  async playMusic(
    uri: string,
    offset: number,
    position_ms: number,
    device_id: string
  ) {
    const res = await axios.put(
      "https://api.spotify.com/v1/me/player/play?device_id=" + device_id,
      {
        context_uri: uri,
        offset: {
          position: offset,
        },
        position_ms: position_ms,
      },
      {
        headers: {
          Authorization: "Bearer " + this.access_token,
          Accept: "application/json",
        },
      }
    );

    return res.data;
  }

  async pause(device_id: string) {
    const res = await axios.put(
      "https://api.spotify.com/v1/me/player/pause?device_id=" + device_id,
      {},
      {
        headers: {
          Authorization: "Bearer " + this.access_token,
          Accept: "application/json",
        },
      }
    );

    return res.data;
  }

  async forward(device_id: string, position: number) {
    const res = await axios.put(
      "https://api.spotify.com/v1/me/player/seek?position_ms=" +
        position +
        "&device_id=" +
        device_id,
      {},
      {
        headers: {
          Authorization: "Bearer " + this.access_token,
          Accept: "application/json",
        },
      }
    );
    return res.data;
  }

  async next(device_id: string) {
    const res = await axios.post(
      "https://api.spotify.com/v1/me/player/next?&device_id=" + device_id,
      {},
      {
        headers: {
          Authorization: "Bearer " + this.access_token,
          Accept: "application/json",
        },
      }
    );
    return res.data;
  }

  async previous(device_id: string) {
    const res = await axios.post(
      "https://api.spotify.com/v1/me/player/previous?&device_id=" + device_id,
      {},
      {
        headers: {
          Authorization: "Bearer " + this.access_token,
          Accept: "application/json",
        },
      }
    );
    return res.data;
  }

  async toggleShuffle(shuffle: boolean, device_id: string) {
    const res = await axios.put(
      `https://api.spotify.com/v1/me/player/shuffle?state=${shuffle}&device_id=` +
        device_id,
      {},
      {
        headers: {
          Authorization: "Bearer " + this.access_token,
          Accept: "application/json",
        },
      }
    );
    return res.data;
  }

  async setVolume(vol: number, device_id: string) {
    const res = await axios.put(
      `https://api.spotify.com/v1/me/player/volume?volume_percent=${vol}&device_id=` +
        device_id,
      {},
      {
        headers: {
          Authorization: "Bearer " + this.access_token,
          Accept: "application/json",
        },
      }
    );
    return res.data;
  }

  async getBrowses() {
    const res = await axios.get(
      "https://api.spotify.com/v1/browse/categories?country=VN&limit=50",
      {
        headers: {
          Authorization: "Bearer " + this.access_token,
          Accept: "application/json",
        },
      }
    );
    return res.data;
  }

  async search(query: string) {
    const res = await axios.get(
      `https://api.spotify.com/v1/search?q=${query}&type=track%2Cartist%2Calbum%2Cplaylist&market=VN&limit=20`,
      {
        headers: {
          Authorization: "Bearer " + this.access_token,
          Accept: "application/json",
        },
      }
    );
    return res.data;
  }

  async getSavedTracks() {
    const res = await axios.get(
      "https://api.spotify.com/v1/me/tracks?limit=50",
      {
        headers: {
          Authorization: "Bearer " + this.access_token,
          Accept: "application/json",
        },
      }
    );
    return res.data;
  }

  async getSavedAlbums() {
    const res = await axios.get(
      "https://api.spotify.com/v1/me/albums?limit=50",
      {
        headers: {
          Authorization: "Bearer " + this.access_token,
          Accept: "application/json",
        },
      }
    );
    return res.data;
  }

  async getAllPlaylists() {
    const res = await axios.get(
      "https://api.spotify.com/v1/me/playlists?limit=50",
      {
        headers: {
          Authorization: "Bearer " + this.access_token,
          Accept: "application/json",
        },
      }
    );
    return res.data;
  }

  async getBrowse(categories_id: string) {
    const res = await axios.get(
      `https://api.spotify.com/v1/browse/categories/${categories_id}/playlists?country=VN&limit=50`,
      {
        headers: {
          Authorization: "Bearer " + this.access_token,
          Accept: "application/json",
        },
      }
    );
    return res.data;
  }

  async getCategory(categories_id: string) {
    const res = await axios.get(
      `https://api.spotify.com/v1/browse/categories/${categories_id}?country=VN`,
      {
        headers: {
          Authorization: "Bearer " + this.access_token,
          Accept: "application/json",
        },
      }
    );
    return res.data;
  }
}

export default new SpotifyAPI();
