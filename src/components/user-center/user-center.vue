<template>
  <transition name="slide">
    <div class="user-center">
      <div class="back" @click="back">
        <i class="icon-back"></i>
      </div>
      <div class="switches-wrapper">
        <switches @switch="switchItem" :switches="switches" :currentIndex="currentIndex"></switches>
      </div>
      <div ref="playBtn" class="play-btn" @click="random">
        <i class="icon-play"></i>
        <span class="text">随机播放全部</span>
      </div>
      <div style="color:rgba(255, 255, 255, 0.5);text-align: center;font-size: 12px;padding-top: 10px" v-if="!hasMore && currentIndex===2">
        <span style="padding-right: 15px">总共 : {{cloudData.count}} 首</span>
        <span>云盘容量 ：{{(cloudData.size/1024/1024/1024).toFixed(1) }}G / {{(cloudData.maxSize/1024/1024/1024).toFixed(1) }}G</span>
      </div>
      <div class="list-wrapper" ref="listWrapper">
        <scroll ref="favoriteList" class="list-scroll" v-if="currentIndex===0" :data="favoriteList">
          <div class="list-inner">
            <song-list :songs="favoriteList" @select="selectSong"></song-list>
          </div>
        </scroll>
        <scroll ref="playList" class="list-scroll" v-if="currentIndex===1" :data="playHistory">
          <div class="list-inner">
            <song-list :songs="playHistory" @select="selectSong"></song-list>
          </div>
        </scroll>

        <scroll ref="cloudSongList" class="list-scroll" v-if="currentIndex===2" :data="cloudSongList" >
          <div class="list-inner" >
            <song-list :songs="cloudSongList" @select="selectSong"></song-list>
          </div>
        </scroll>

      </div>
      <div class="no-result-wrapper" v-show="noResult && !hasMore">
        <no-result :title="noResultDesc"></no-result>
      </div>

      <loading title="正在加载网盘歌曲...." v-show="hasMore && currentIndex===2"></loading>

    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import Switches from 'base/switches/switches'
  import Scroll from 'base/scroll/scroll'
  import SongList from 'base/song-list/song-list'
  import NoResult from 'base/no-result/no-result'
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import {playlistMixin} from 'common/js/mixin'
  import {getCloudSongList} from 'api/my'
  import {config} from 'api/config'
  import {createCloudSong} from 'common/js/song'
  import Loading from 'base/loading/loading'
  export default {
    mixins: [playlistMixin],
    data() {
      return {
        pullup: true,
        beforeScroll: true,
        cloudSongList: [],
        cloudData:{
          count:0,
          size: 0,
          maxSize: 0
        },
        hasMore: true,
        currentIndex: parseInt(this.$route.params.flag),
        switches: [
          {
            name: '我喜欢的'
          },
          {
            name: '最近听的'
          },{
            name: '我的云盘'
          }
        ]
      }
    },
    computed: {
      noResult() {
        if (this.currentIndex === 0) {
          return !this.favoriteList.length
        } else if (this.currentIndex === 1) {
          return !this.playHistory.length
        }else if (this.currentIndex ===2) {
          return !this.cloudSongList.length
        }
      },
      noResultDesc() {

        if (this.currentIndex === 0) {
          return '暂无收藏歌曲'
        } else if(this.currentIndex===1) {
          return '你还没有听过歌曲'
        } else if(this.currentIndex===2 && this.hasMore==false) {
          return '网盘没有数据,你可以返回登录后查看'
        }
      },
      ...mapGetters([
        'favoriteList',
        'playHistory',
        'cloudCacheList'
      ])
    },
    created() {
      if(this.currentIndex===2){
        //查询云盘歌曲
        getCloudSongList().then((res) => {
          if (res.code == config.apiConfig.request_ok) {
            this.cloudData.count=res.count;
            this.cloudData.size=res.size;
            this.cloudData.maxSize=res.maxSize;
            console.log(this.cloudData)
            var cloudSongList=this._normalizeSongs(res.data);
            this.cloudSongList = cloudSongList;
            this.hasMore=false
          }
        })

      }


    },
    methods: {
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.listWrapper.style.top = '130px'
        this.$refs.listWrapper.style.bottom = bottom
        this.$refs.favoriteList && this.$refs.favoriteList.refresh()
        this.$refs.playList && this.$refs.playList.refresh()
        this.$refs.cloudSongList && this.$refs.cloudSongList.refresh()

      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.songId) {
            ret.push(createCloudSong(musicData))
          }
        })
        return ret
      },
      switchItem(index) {
        this.currentIndex = index
        if(this.currentIndex===2 && this.cloudSongList.length==0){
          //查询云盘歌曲
          getCloudSongList().then((res) => {
            if (res.code == config.apiConfig.request_ok) {
              this.cloudData.count=res.count;
              this.cloudData.size=res.size;
              this.cloudData.maxSize=res.maxSize;
              var cloudSongList=this._normalizeSongs(res.data);
              this.cloudSongList = cloudSongList;
              this.hasMore=false
            }
          })

        }

      },
      selectSong(song) {
        this.insertSong(song)
      },
      back() {
        this.$router.back()
        this.$destroy();
      },

      random() {
        let list = this.currentIndex === 0 ? this.favoriteList : this.playHistory
        if(this.currentIndex===2){
           list =this.cloudSongList;
        }
        if (list.length === 0) {
          return
        }
        list = list.map((song) => {
          return song
        })
        this.randomPlay({
          list
        })
      },
      ...mapActions([
        'insertSong',
        'randomPlay'
      ])
    },
    components: {
      Switches,
      Scroll,
      SongList,
      NoResult,
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .user-center
    position: fixed
    top: 0
    bottom: 0
    z-index: 100
    width: 100%
    background: $color-background
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .switches-wrapper
      margin: 10px 0 30px 0
    .play-btn
      box-sizing: border-box
      width: 135px
      padding: 7px 0
      margin: 0 auto
      text-align: center
      border: 1px solid  $color-text-l
      color: $color-text-l
      border-radius: 100px
      font-size: 0
      .icon-play
        display: inline-block
        vertical-align: middle
        margin-right: 6px
        font-size: $font-size-medium-x
      .text
        display: inline-block
        vertical-align: middle
        font-size: $font-size-small
    .list-wrapper
      position: absolute
      top: 110px
      bottom: 0
      width: 100%
      .list-scroll
        height: 100%
        overflow: hidden
        .list-inner
          padding: 20px 30px
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
