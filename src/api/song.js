/**
 * @description 歌曲相关api
 * @author simple
 * @date 2018/11/27 11:24
 */
import {fetch} from 'common/js/common'

/**
 * 获取歌曲歌词
 * @param id 歌曲id
 * @returns 歌词
 */
export function getLyric(id) {
  const url="/song/lyric";
  const data={
    id:id,
  }
  return fetch(url,data);
}

/**
 * 获取咪咕音乐信息
 */
export function getMiguInfo(id){
  const url="/migu/getSongInfo";
  const data={
    id:id,
  }
  return fetch(url,data);
}

/**
 * 获取mv信息
 * @param id
 * @returns mv详细信息
 */
export function getMvInfo (id) {
  const url="/mv/detail";
  const data={
    id:id,
  }
  return fetch(url,data);
}

/**
 * 获取qq音乐源
 * @param searchStr 歌手+歌曲进行搜索
 * @returns url
 */
export function getQQMusic (searchStr,musicId,musicType) {
  const url="qq/switchSource";
  const data={
    searchStr:searchStr,
    musicId: musicId,
    musicType:musicType
  }
  return fetch(url,data);
}
/**
 * 获取酷狗播放源
 * @param hash 歌曲hash值
 * @returns url
 */
export function getKugouMusic (hash) {
  const url="kugou/getSongDetail";
  const data={
    musicHash:hash,
  }
  return fetch(url,data);
}

/**
 * 获取qq音乐歌词
 * @param id
 * @returns {*}
 */
export function getQQLyric(id){
  const  url="qq/getLyric";
  const data ={
    musicId: id
  }
  return fetch(url,data);


}

export function getKugouLyric(hash){
  const url="kugou/getLyric"
  const data={
    musicHash: hash
  }
  return fetch(url,data);
}
