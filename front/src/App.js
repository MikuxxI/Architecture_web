import React, { useState } from 'react';

// Exemple d'état de vidéos (vous devrez le remplacer par vos propres données)
const initialVideos = [
  {
    title: '007',
    description: 'Description de la vidéo 1',
    url: 'lien_vers_la_video_1',
    likes: 0,
  },
  {
    title: 'Terminator',
    description: 'Description de la vidéo 2',
    url: 'lien_vers_la_video_2',
    likes: 0,
  },
  // ... Ajoutez d'autres vidéos ici
];

function LikeButton({ video }) {
  const [likes, setLikes] = useState(video.likes);

  const handleLikeClick = () => {
    setLikes(likes + 1);
  };

  return (
    <button onClick={handleLikeClick}>
      J'aime ({likes})
    </button>
  );
}

function Thumbnail({ video }) {
  return (
    <div className="thumbnail">
      {/* Affichez la miniature de la vidéo ici */}
    </div>
  );
}

function Video({ video }) {
  return (
    <div className="video">
      <Thumbnail video={video} />
      <a href={video.url}>
        <h3>{video.title}</h3>
        <p>{video.description}</p>
      </a>
      <LikeButton video={video} />
    </div>
  );
}

function SearchableVideoList({ videos }) {
  const [searchText, setSearchText] = useState('');

  // Fonction de filtrage des vidéos en fonction du texte de recherche
  const filterVideos = (videos, searchText) => {
    return videos.filter(video =>
      video.title.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  // Composant de recherche
  const SearchInput = () => (
    <input
      type="text"
      placeholder="Rechercher des vidéos"
      value={searchText}
      onChange={handleSearchInputChange} // Utilisez la fonction de gestion du changement
    />
  );

  // Composant pour afficher la liste filtrée de vidéos
  const VideoList = ({ videos, emptyHeading }) => (
    <div>
      <h2>Résultats de recherche</h2>
      {videos.length === 0 ? (
        <p>{emptyHeading}</p>
      ) : (
        videos.map((video, index) => (
          <Video key={index} video={video} />
        ))
      )}
    </div>
  );

  // Fonction de gestion du changement de texte de recherche
  const handleSearchInputChange = (event) => {
    setSearchText(event.target.value);
  };

  // Appel de la fonction de filtrage et affichage des résultats
  const foundVideos = filterVideos(videos, searchText);

  return (
    <div>
      <SearchInput />
      <VideoList videos={foundVideos} emptyHeading={`Aucune vidéo trouvée pour "${searchText}"`} />
    </div>
  );
}

function App() {
  const [videos, setVideos] = useState(initialVideos);

  return (
    <div className="App">
      <h1>Ma liste de vidéos</h1>
      {videos.map((video, index) => (
        <Video key={index} video={video} />
      ))}
      <SearchableVideoList videos={videos} />
    </div>
  );
}

export default App;
