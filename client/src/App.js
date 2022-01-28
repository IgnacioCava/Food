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
import sound from 'C:/Users/User/Desktop/Henry/PI-Food-main/client/src/Components/Props/backgroundSound.mp3'

function App() {
  return (
    <div className="App">
    <audio id='audio' src={sound} loop='loop'></audio>
      <Routes>
        <Route 
          path='/*'
          element={<Welcome/>}
        />
        <Route
          path='/home'
          element={
            <AppWrapper>
              <Controls>
                <Indexer/>
                <SearchBar/>
                <Create><Link to='/create'>Create recipe</Link></Create>
              </Controls>
              <RecipesHolder/>
            </AppWrapper>}
        />
        <Route 
          path='/recipe/:id/*'
          element={<Detail/>}
        />
        <Route 
          path='/create/*'
          element={<Creator/>}
        />
        <Route path='*' element={
          <AppWrapper>
            <Controls>
              <Indexer/>
              <SearchBar/>
              <Create><Link to='/create'>Create recipe</Link></Create>
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
  background-color:lightgreen;
  padding:20px;
  border-radius:10px;
  z-index: 2;
  cursor:pointer;
  @media (max-width:850px){
    position: fixed;
    bottom:5px;
  }
  a{
    text-decoration: none;
    color: black;
    font-weight:bold;
  }
`

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100vw;
  min-width: 400px;
`

const Controls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  background-color:rgba(1,1,1,.5);
  @media (max-width:850px){
    flex-direction: column;
  }
`