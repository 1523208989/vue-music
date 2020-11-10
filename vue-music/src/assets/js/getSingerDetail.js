class Song {
  constructor(name, title, album, mid, img_url,id) {
    this.name = name;
    this.title = title;
    this.album = album;
    this.mid = mid;
    this.img_url = img_url;
    this.id=id;
  }
}
export default (songList) => {
  return songList.map(item => {
    let singers = item.singer.map(item => {
      return item.name
    })
    return new Song(singers.join('/'), item.title,
     item.album.name, item.mid, 
     `https://y.gtimg.cn/music/photo_new/T002R300x300M000${item.album.mid}.jpg?max_age=2592000`,item.id)
  })
}