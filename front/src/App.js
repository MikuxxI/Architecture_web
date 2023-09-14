import React, { useState } from 'react';
import './App.css';
import Documents from './components/Documents';

function App() {
  const [selectedFiles, setSelectedFiles] = useState([]);

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

      <h1>Vos fichiers</h1>
      <Documents />
    </div>
  );
}

export default App;