class Song {
  constructor(name, title, album, mid, img_url) {
    this.name = name;
    this.title = title;
    this.album = album;
    this.mid = mid;
    this.img_url = img_url
  }
}
export default (songList) => {
  return songList.map(item => {
    let singers = item.songInfo.singer.map(item => {
      return item.name
    })
    return new Song(singers.join('/'), item.songInfo.title,
     item.songInfo.album.name, item.songInfo.mid, 
     `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.songInfo.album.mid}.jpg?max_age=2592000`)
  })
}