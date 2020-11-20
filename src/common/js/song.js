import {fetch} from 'common/js/common';
import {config} from 'api/config';
export default class Song {
  constructor({id, mid, singer, name, album, dt, image, url,mv,alias,musicType,hash,copyrightId}) {
    this.id = id
    this.singer = singer
    this.name = name
    this.album = album
    this.dt = dt
    this.image = image
    this.url = url
    this.mv = mv
    this.alias = alias
    this.musicType=musicType
    this.copyrightId=copyrightId
    this.hash=hash
  }

}

export function getMusicUrl(musicId){
  const data={
    ids:musicId
  };
  const url="/song/player";
  fetch(url,data).then(res=>{

    if (res.code == config.apiConfig.request_ok) {
      return res.data[0].url;
    }
  })
}

export function createCloudSong(musicData){
  return new Song({
    id: musicData.songId,
    singer: filterSinger(musicData.simpleSong.ar),
    name: musicData.songName,
    album: musicData.simpleSong  ? '':musicData.simpleSong.al.name ,
    dt: 0,
    image: musicData.simpleSong.al? musicData.simpleSong.al.picUrl:'',
    url: "",
    mv: '',
    alias: '',
    musicType:'cloud'
  })


}


export function createSong(musicData) {
  return new Song({
    id: musicData.id,
    singer: filterSinger(musicData.ar),
    name: musicData.name,
    album: musicData.al.name,
    dt: 0,
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
    dt: 0,
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
    dt: 0,
    image: musicData.al.picUrl,
    url: `http://music.163.com/song/media/outer/url?id=${musicData.id}.mp3`,
    // url: getMusicUrl(musicData.id),
    mv:musicData.mv,
    alias:musicData.alia
  })
}

export  function createMiguData(musicData){
  return new Song({
    id: musicData.id,
    singer: musicData.singerName,
    name: musicData.songName,
    album: musicData.albumName,
    image: musicData.cover,
    url: musicData.mp3,
    dt: 0,
    alias:[],
    // url: getMusicUrl(musicData.id),
    mv:musicData.mvId,
    musicType: 'migu',
    hash: '',
    copyrightId: musicData.copyrightId
  })
}
export function createQQData(musicData) {
  return new Song({
    id: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    image: "http://y.gtimg.cn/music/photo_new/T002R300x300M000"+musicData.albummid+"_1.jpg%3Fmax_age=2592000",
    url: `http://www.baidu.com`,
    dt: 0,
    alias: [],
    mv: musicData.vid,
    musicType: 'qq',
    hash: '',
    copyrightId: ''

  })

}
  export function createKugouData(musicData){
    return new Song({
      id: musicData.audio_id,
      singer: musicData.singername,
      name: musicData.songname,
      album: musicData.album_name,
      image: "",
      url:`http://www.google.com`,
      dt: 0,
      alias:[],
      mv: "",
      musicType: 'kugou',
      hash: musicData.hash,
      copyrightId: ''
    })
}

function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    if(s.id==0){
      ret.push("未知")
    }else{
      ret.push(s.name)
    }
  })
  return ret.join('/')
}

