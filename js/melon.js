const listEl = document.getElementById('chartList');
const statusEl = document.getElementById('status');
const totalEl = document.getElementById('total');

function createCard(song) {
  const li = document.createElement('li');
  li.className = 'card';

  const cover = document.createElement('div');
  cover.className = 'cover';

  const img = document.createElement('img');
  img.src = song.albumCover;
  img.alt = song.title;
  img.loading = 'lazy';

  const rank = document.createElement('p');
  rank.className = 'rank' + (song.rank <= 3 ? ' top3' : '');
  rank.textContent = song.rank;

  cover.append(img, rank);

  const info = document.createElement('div');
  info.className = 'info';

  const title = document.createElement('p');
  title.className = 'title';
  title.textContent = song.title;
  title.title = song.title;

  const artist = document.createElement('p');
  artist.className = 'artist';
  artist.textContent = song.artist;
  artist.title = song.artist;

  const likes = document.createElement('p');
  likes.className = 'likes';
  likes.textContent = Number(song.likes).toLocaleString('ko-KR');

  info.append(title, artist, likes);
  li.append(cover, info);
  return li;
}

async function loadChart() {
  try {
    const res = await fetch('melon.json');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const songs = await res.json();

    const frag = document.createDocumentFragment();
    songs.sort((a, b) => a.rank - b.rank).forEach(s => frag.appendChild(createCard(s)));
    listEl.appendChild(frag);

    totalEl.textContent = songs.length;
    statusEl.remove();
  } catch (err) {
    statusEl.textContent = '데이터를 불러오지 못했습니다. (' + err.message + ') 로컬 서버로 실행해 주세요.';
  }
}

loadChart();
