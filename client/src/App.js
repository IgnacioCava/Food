import './App.css';
import React from 'react'
import {Route, Routes, Link} from 'react-router-dom'
import RecipesHolder from './Components/RecipesHolder'
import SearchBar from './Components/SearchBar'
import Welcome from './Components/Welcome';
import styled from 'styled-components'
import Indexer from './Components/Indexer'
import Detail from './Components/Detail'
import Creator from './Components/Creator';

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
                <Indexer/>
                <SearchBar/>
                <Create><Link to='/create'>Create</Link></Create>
              </Controls>
              <RecipesHolder/>
            </AppWrapper>}
        />
        <Route 
          path='/recipe/:id'
          element={<Detail/>}
        />
        <Route 
          path='/create'
          element={<Creator/>}
        />
        <Route path='*' element={
          <AppWrapper>
            <Controls>
              <Indexer/>
              <SearchBar/>
              
            </Controls>
            <RecipesHolder/>
          </AppWrapper>
        }/>
      </Routes>
    </div>
  );
}

export default App;

const Create = styled.div`

`

const AppWrapper = styled.div`
display: flex;
flex-direction: column;
position: absolute;
height: 100vh;
width: 100vw;
`

const Controls = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-evenly;
height: 15%;
`