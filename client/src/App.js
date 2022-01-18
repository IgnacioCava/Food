import './App.css';
import React from 'react'
import {Route, Routes} from 'react-router-dom'
import RecipesHolder from './Components/RecipesHolder'
import SearchBar from './Components/SearchBar'
import Welcome from './Components/Welcome';
import styled from 'styled-components'
import Indexer from './Components/Indexer'

function App() {
  return (
    <div className="App">
      {/* <h1>Henry Food</h1> */}
      
      
      <Routes>
        <Route 
          path='/'
          element={<Welcome/>}
        />
        <Route
          path='/home'
          element={
            <AppWrapper>
              <Controls>
                <SearchBar/>
                <Indexer/>
              </Controls>
              <RecipesHolder/>
            </AppWrapper>}
        />
      </Routes>
    </div>
  );
}

export default App;

const AppWrapper = styled.div`
display: flex;
flex-direction: row-reverse;
position: absolute;
height: 100vh;
width: 100vw;
`

const Controls = styled.div`
display: flex;
flex-direction: column;
`