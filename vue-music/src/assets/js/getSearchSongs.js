class Song{
  constructor(name, title, album, mid, img_url,id) {
    this.name = name;
    this.title = title;
    this.album = album;
    this.mid = mid;
    this.img_url = img_url;
    this.id=id;
  }
}
export default (songs)=>{
  songs.reduce((a,b)=>{
    a.push(new Song(item.singer,item.name))
  },[])
}
id: "214172912"
mid: "003HHPxJ4638xA"
name: "只要平凡"
singer: "张杰/张碧晨"