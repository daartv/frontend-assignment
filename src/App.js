import React, { useState } from "react";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";
import searchIcon from "./magnifying-glass.svg";
import "./App.css";

const GET_SEARCH_RESULTS = gql`
  query getSearchResults($searchTerm: String!, $searchFilters: [SearchEntity]) {
    search(query: $searchTerm, first: 2, entities: $searchFilters) {
      edges {
        node {
          displayLabel
        }
      }
    }
  }
`;

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchFilters, setSearchFilters] = useState([]);
  return (
    <div className="root">
      <div className="searchBar">
        <img height="20px" width="20" src={searchIcon} />
        <input
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          size="100"
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
        <Query query={GET_SEARCH_RESULTS} variables={{ searchTerm, searchFilters }}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            console.log(data);
            return data.search.edges.map(edge => (
              <div>{edge.node.displayLabel}</div>
            ));
          }}
        </Query>
      </pre>
    </div>
  );
};

export default App;
