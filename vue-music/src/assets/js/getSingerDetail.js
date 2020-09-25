class Song {
  constructor(name, title, album, media_mid) {
    this.name = name;
    this.title = title;
    this.album = album;
    this.media_mid = media_mid;
  }
}

export default (songList) => {
  return songList.map(item => {
    let singers = item.songInfo.singer.map(item => {
      return item.name
    })
    return new Song(singers.join('/'), item.songInfo.title, item.songInfo.album.name, item.songInfo.file.media_mid)
  })

}