import React, { useEffect, useState } from "react";
import axios from "axios";
import { Document } from 'react-pdf'

function Documents() {
  const [documents, setDocuments] = useState([]);
  const [search, setSearch] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/docs?search=${search}`)
      .then((response) => {
        setDocuments(response.data.documents);
        console.log(JSON.stringify(response.data, null, 2));
      })
      .catch((error) => {
        console.error("Une erreur s'est produite lors de la récupération des documents :", error);
      });
  }, [search]);

  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher des documents"
        value={search}
        onChange={(e) => e === '' ? setSearch(null) : setSearch(e.target.value)}
      />
      {search && documents.map((item, i) => (
        <div key={i}>
          <a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a>
        </div>
      ))}
    </div>
  );
}

export default Documents;
