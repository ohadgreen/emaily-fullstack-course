// http://rallycoding.herokuapp.com/api/music_albums



// function fetchAlbums() {
//   fetch(URL)
//     .then(res => res.json())
//     .then(json => console.log(json));
// }

// async await
const URI = "http://rallycoding.herokuapp.com/api/music_albums";

async function fetchAlbums() {
  const res = await fetch(URI);
  const json = await res.json();

  console.log(json);
}

fetchAlbums();

// Arrow function

const URI2 = "http://rallycoding.herokuapp.com/api/music_albums";
const fetchAlbums = async () => {
    const res = await fetch(URI2);
    const albums = await res.json();
  
    console.log(albums);
}

fetchAlbums();