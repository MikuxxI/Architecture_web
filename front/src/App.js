import React, { useState } from 'react';
import './App.css';

function App() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [searchValue, setSearchValue] = useState(''); // État pour la valeur de recherche
  const [documents, setDocuments] = useState([
    {
      title: "Document 1",
      date: "12 septembre 2023",
      content: "Contenu du document 1..."
    },
    {
      title: "Document 2",
      date: "15 septembre 2023",
      content: "Contenu du document 2..."
    }
    // Ajoutez d'autres documents ici
  ]);

  const handleDrop = (e) => {
    e.preventDefault();
  
    const files = Array.from(e.dataTransfer.files);
  
    // Vérifier chaque fichier pour s'assurer qu'il est accepté
    const invalidFiles = files.filter((file) => {
      const fileType = file.name.split('.').pop(); // Obtenir l'extension du fichier
      return !['pdf', 'docx', 'doc'].includes(fileType.toLowerCase()); // Vérifier l'extension
    });
  
    if (invalidFiles.length > 0) {
      // Afficher un message d'erreur pour les fichiers non autorisés
      alert('Les fichiers suivants ne sont pas autorisés : ' + invalidFiles.map((file) => file.name).join(', '));
    } else {
      setSelectedFiles(files);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
  
    // Vérifier chaque fichier pour s'assurer qu'il est accepté
    const invalidFiles = files.filter((file) => {
      const fileType = file.name.split('.').pop(); // Obtenir l'extension du fichier
      return !['pdf', 'docx', 'doc'].includes(fileType.toLowerCase()); // Vérifier l'extension
    });
  
    if (invalidFiles.length > 0) {
      // Afficher un message d'erreur pour les fichiers non autorisés
      alert('Les fichiers suivants ne sont pas autorisés : ' + invalidFiles.map((file) => file.name).join(', '));
    } else {
      setSelectedFiles(files);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Vérifier s'il y a des fichiers sélectionnés
    if (selectedFiles.length === 0) {
      alert('Veuillez sélectionner des fichiers avant d\'envoyer le formulaire.');
      return;
    }
  
    // Parcourir les fichiers sélectionnés et afficher leurs noms dans la console
    selectedFiles.forEach((file) => {
      console.log('Nom du fichier :', file.name);
      // Ici, vous pouvez ajouter votre logique pour envoyer les fichiers au serveur si nécessaire.
    });
  
    // Réinitialiser la liste des fichiers sélectionnés
    setSelectedFiles([]);
  };

  // Fonction pour filtrer les documents en fonction de la valeur de recherche
  const filteredDocuments = documents.filter((document) =>
    document.title.toLowerCase().includes(searchValue.toLowerCase()) || document.content.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="form-container">
      <h1>Déposez vos fichiers</h1>
      <form onSubmit={handleSubmit} onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
        <div className="file-drop-zone">
          <input
            type="file"
            id="fileInput"
            multiple
            onChange={handleFileSelect}
            accept=".docx, .doc, .pdf" // Types de fichiers acceptés
          />
          <label htmlFor="fileInput">Sélectionnez des fichiers ou faites-les glisser ici.</label>
          <ul>
            {selectedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
        <button type="submit">Envoyer</button>
      </form>

      {/* Barre de recherche */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher des documents"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      <h1>Vos fichiers</h1>
      {/* Afficher les documents filtrés */}
      <ul>
        {filteredDocuments.map((document, index) => (
          <li key={index}>
            <h2>{document.title}</h2>
            <p>Date : {document.date}</p>
            <p>{document.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;