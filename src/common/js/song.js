import {fetch} from 'common/js/common';
import {config} from 'api/config';
export default class Song {
  constructor({id, mid, singer, name, album, dt, image, url,mv,alias}) {
    this.id = id
    this.singer = singer
    this.name = name
    this.album = album
    this.dt = dt
    this.image = image
    this.url = url
    this.mv = mv
    this.alias = alias

  }

}

export function getMusicUrl(musicId){
  const data={
    ids:musicId
  };
  const url="/song/player";
  fetch(url,data).then(res=>{
    console.log(res.data[0].url);
    if (res.code == config.apiConfig.request_ok) {
      return res.data[0].url;
    }
  })
}


export function createSong(musicData) {
  return new Song({
    id: musicData.id,
    singer: filterSinger(musicData.ar),
    name: musicData.name,
    album: musicData.al.name,
    dt: musicData.dt,
    image: musicData.al.picUrl,
    imagev1:musicData.al.picUrl,
    url: `http://music.163.com/song/media/outer/url?id=${musicData.id}.mp3`,
    // url: getMusicUrl(musicData.id),
    mv:musicData.mv,
    alias:""
  })
}

export function createSongV2(musicData) {
  return new Song({
    id: musicData.id,
    singer: filterSinger(musicData.artists),
    name: musicData.name,
    album: musicData.album.name,
    dt: musicData.duration,
    image: musicData.album.picUrl,
    imagev1:musicData.album.picUrl,
    url: `http://music.163.com/song/media/outer/url?id=${musicData.id}.mp3`,
    // url: url,
    mv:musicData.mvid,
    alias:""
  })
}

export function createSongBySinger(musicData) {
  return new Song({
    id: musicData.id,
    singer: filterSinger(musicData.ar),
    name: musicData.name,
    album: musicData.al.name,
    dt: musicData.dt,
    image: musicData.al.picUrl,
    url: `http://music.163.com/song/media/outer/url?id=${musicData.id}.mp3`,
    // url: getMusicUrl(musicData.id),
    mv:musicData.mv,
    alias:musicData.alia
  })
}



function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
