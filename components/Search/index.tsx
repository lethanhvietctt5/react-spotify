import { useAppSelector } from "hooks";
import React, { useEffect, useState } from "react";
import spotify from "spotify";
import Browse from "./Browse";
import Result from "./Result";

export interface ArtistResult {
  id: string;
  followers: number;
  name: string;
  image: string;
}

export interface TrackResult {
  id: string;
  name: string;
  uri: string;
  offset: number;
  artist: string;
  image: string;
}

export interface AlbumResult {
  id: string;
  uri: string;
  name: string;
  artist: string;
  image: string;
}

export interface PlaylistResult {
  id: string;
  name: string;
  uri: string;
  image: string;
  owner: string;
}

export interface IResult {
  artists: ArtistResult;
  albums: AlbumResult[];
  tracks: TrackResult[];
  playlists: PlaylistResult[];
}

export default function Search() {
  const keyword = useAppSelector((state) => state.search.keyword);
  const [result, setResult] = useState<IResult>();

  const fetchResult = async () => {
    const res = await spotify.search(keyword);
    let artists: ArtistResult = {} as ArtistResult;
    let albums: AlbumResult[] = [] as AlbumResult[];
    let tracks: TrackResult[] = [] as TrackResult[];
    let playlists: PlaylistResult[] = [] as PlaylistResult[];

    artists.id = res.artists.items[0].id;
    artists.name = res.artists.items[0].name;
    artists.followers = res.artists.items[0].followers.total;
    artists.image = res.artists.items[0].images[0].url;

    let singleAlbum: AlbumResult = {} as AlbumResult;
    for (const album of res.albums.items) {
      singleAlbum.id = album.id;
      singleAlbum.name = album.name;
      singleAlbum.uri = album.uri;
      singleAlbum.image = album.images[0].url;
      singleAlbum.artist = album.artists
        .map((artist: { id: string; name: string }) => artist.name)
        .join(", ");
      albums.push(JSON.parse(JSON.stringify(singleAlbum)));
    }

    let singleTrack: TrackResult = {} as TrackResult;
    for (const track of res.tracks.items) {
      singleTrack.artist = track.artists
        .map((artist: { id: string; name: string }) => artist.name)
        .join(", ");

      singleTrack.id = track.id;
      singleTrack.name = track.name;
      singleTrack.image = track.album.images[0].url;
      singleTrack.offset = track.track_number;
      singleTrack.uri = track.album.uri;
      tracks.push(JSON.parse(JSON.stringify(singleTrack)));
    }

    let singlePlaylist: PlaylistResult = {} as PlaylistResult;
    for (const playlist of res.playlists.items) {
      singlePlaylist.id = playlist.id;
      singlePlaylist.image = playlist.images[0].url;
      singlePlaylist.name = playlist.name;
      singlePlaylist.owner = playlist.owner.display_name;
      singlePlaylist.uri = playlist.uri;
      playlists.push(JSON.parse(JSON.stringify(singlePlaylist)));
    }

    setResult({ artists, albums, tracks, playlists });
  };

  console.log(result);

  useEffect(() => {
    setResult({
      artists: { id: "", name: "", followers: 0, image: "" },
      albums: [],
      tracks: [],
      playlists: [],
    });
    if (keyword.length > 0) {
      fetchResult();
    }
  }, [keyword]);

  return (
    <div>{keyword.length > 0 ? <Result result={result} /> : <Browse />}</div>
  );
}
