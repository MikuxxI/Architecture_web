import React, { useEffect, useState } from "react";
import axios from "axios";
import { Document, Page } from "react-pdf";
import PdfViewerComponent from './PdfViewerComponent.js';

function Documents() {
  const [documents, setDocuments] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    if (search === "") {
      setDocuments([]);
    } else {
      axios
        .get(`http://localhost:3000/docs?search=${search}`)
        .then((response) => {
          setDocuments(response.data.documents);
        })
        .catch((error) => {
          console.error(
            "Une erreur s'est produite lors de la récupération des documents :",
            error
          );
        });
    }
  }, [search]);

  const loadDocument = (documentUrl) => {
    setSelectedDocument(documentUrl);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () => {
    setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);
  };

  const goToNextPage = () => {
    setPageNumber(
      pageNumber + 1 >= numPages ? numPages : pageNumber + 1
    );
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher des documents"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {documents.map((item, i) => (
        <div key={i}>
            <h2>{item.name}</h2>
            <div className="PDF-viewer">
            <PdfViewerComponent
                document={item.name}
            />
        </div>
        </div>
      ))}
      {selectedDocument && (
        <div>
          <Document file={selectedDocument} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
          <div>
            <button onClick={goToPrevPage}>Prev</button>
            <button onClick={goToNextPage}>Next</button>
          </div>
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </div>
      )}
    </div>
  );
}

export default Documents;
