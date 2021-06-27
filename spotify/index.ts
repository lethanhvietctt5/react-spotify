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

class Spotify {
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
}

export default new Spotify();
