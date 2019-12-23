import React, { useState } from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import searchIcon from "./magnifying-glass.svg";
import "./App.css";

const GET_SEARCH_RESULTS = gql`
  query getSearchResults($searchTerm: String!, $searchFilters: [SearchEntity]) {
    search(query: $searchTerm, first: 10, entities: $searchFilters) {
      edges {
        node {
          displayLabel
          imageUrl
          href
        }
      }
    }
  }
`;

const goToResult = (href) => {
  window.location.href = href;
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFilters, setSearchFilters] = useState([]);
  return (
    <div className="container root">
      <div className="searchBar">
        <img className="searchIcon" height="20px" width="20" src={searchIcon} />
        <input
          className="input"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          size="50"
          placeholder="Search by artist, gallery, theme, style, theme, tag, etc."
        />
      </div>
      <div className="filters">
        <div
          onClick={() =>
            setSearchFilters([...new Set([...searchFilters, "ARTIST"])])
          }
          className={`filter ${
            searchFilters.includes("ARTIST") ? "selected" : ""
          }`}
        >
          Artists
        </div>
        <div
          onClick={() =>
            setSearchFilters([...new Set([...searchFilters, "ARTWORK"])])
          }
          className={`filter ${
            searchFilters.includes("ARTWORK") ? "selected" : ""
          }`}
        >
          Artworks
        </div>
        <div
          onClick={() =>
            setSearchFilters([...new Set([...searchFilters, "ARTICLE"])])
          }
          className={`filter ${
            searchFilters.includes("ARTICLE") ? "selected" : ""
          }`}
        >
          Articles
        </div>
        <div
          onClick={() =>
            setSearchFilters([...new Set([...searchFilters, "CITY"])])
          }
          className={`filter ${
            searchFilters.includes("CITY") ? "selected" : ""
          }`}
        >
          Cities
        </div>
        <div
          onClick={() =>
            setSearchFilters([...new Set([...searchFilters, "COLLECTION"])])
          }
          className={`filter ${
            searchFilters.includes("COLLECTION") ? "selected" : ""
          }`}
        >
          Collections
        </div>
      </div>
      <pre style={{ whiteSpace: "pre-wrap" }}>
        <Query
          query={GET_SEARCH_RESULTS}
          variables={{ searchTerm, searchFilters }}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            console.log(data);
            return data.search.edges.map(edge => (
              <div onClick={() => goToResult(edge.node.href)} className="result">
                <span className="label">{edge.node.displayLabel}</span>
                <img className="resultImage" height="40" width="40" src={edge.node.imageUrl} />
              </div>
            ));
          }}
        </Query>
      </pre>
    </div>
  );
};

export default App;
