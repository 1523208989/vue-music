class Song {
  constructor(name, title, album, mid, img_url,id) {
    this.name = name;
    this.title = title;
    this.album = album;
    this.mid = mid;
    this.img_url = img_url;
    this.id=id
  }
}
export default (songList) => {
  return songList.map(item => {
    let singers = item.singer.map(item => {
      return item.name
    })
    return new Song(singers.join('/'), item.songname,
     item.albumname, item.songmid, 
     `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.albummid}.jpg?max_age=2592000`,0)
  })
}