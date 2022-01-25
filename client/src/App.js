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
import menu from 'C:/Users/User/Desktop/Henry/PI-Food-main/client/src/Components/menubackg.jpg'
import hmenu from 'C:/Users/User/Desktop/Henry/PI-Food-main/client/src/Components/horizontalmenubackg.jpg'

function App() {
  return (
    <div className="App">

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
              <Create><Link to='/create'>Create</Link></Create>
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
@media (max-width:800px){
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
height: 100vh;
width: 100vw;
min-width: 400px;
min-height: 100vh;
/* background-image: url(${hmenu});
background-size: 100% 100%;
background-attachment: fixed;
background-repeat: no-repeat;
background-color:grey;
@media (max-width:800px){
  background-image: url(${menu});
}  */
`

const Controls = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-evenly;
background-color:rgba(1,1,1,.5);
@media (max-width:800px){
  flex-direction: column;
}
`