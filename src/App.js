// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
 
import React, { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid'; 
import SearchBar from "material-ui-search-bar";
import {  Typography } from "@mui/material";
const columns = [
  { field: 'userId', headerName: 'User ID', width: 70 },
  { field: 'id', headerName: 'Id', width: 130 },
  { field: 'title', headerName: 'Title', width: 130 },
  {
    field: 'completed',
    headerName: 'Status',
    width: 90,
  }, 
];

export default function DataTable() {
  
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [searched, setSearched] = useState("");
   const requestSearch = (searchedVal) => {
    const filteredRows = items.filter((row) => {
      return row.title.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setItems(filteredRows);
  };
  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };
  
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
       
        <div style={{ height: 400, width: '100%' }}>
            <div className="state_head" >
            <Typography variant="h4" color="secondary" className="text-left">
          List
        
        </Typography>
         
      </div>
          <SearchBar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
          <DataGrid
            rows={items}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
      
    );
  }
}
 

