import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import store from './store/index.js';
import Creator from './Components/Creator'
import Detail from './Components/Detail'
import Welcome from './Components/Welcome'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

describe('Landing page', () => {
  
  it("Debe haber un botón para iniciar la secuencia introductoria", () => {
    render(<Provider store={store}> 
            <BrowserRouter>
              <Welcome/>
            </BrowserRouter>
          </Provider>);
    const home = screen.getByText("After a 5 minute drive, you finally arrive at the restaurant.")
    expect(home).toBeInTheDocument();    
  });
  it("Debe haber un botón para ingresar a la homepage", () => {
    render(<Provider store={store}> 
            <BrowserRouter>
              <Welcome/>
            </BrowserRouter>
          </Provider>);
    const logo = screen.getByText('Take a seat');
    expect(logo).toBeInTheDocument();    
  }); 
});

describe('Creation page', () => {
  
  it("Debe haber un botón para crear recetas", () => {
    render(<Provider store={store}> 
            <BrowserRouter>
              <Creator/>
            </BrowserRouter>
          </Provider>);
    const a = screen.getByText("Create")
    expect(a).toBeInTheDocument();    
  });
});

describe('Detail page', () => {
  
  it("Debe mostrar un elemento loading", () => {
    render(<Provider store={store}> 
            <BrowserRouter>
              <Detail/>
            </BrowserRouter>
          </Provider>);
    const home = screen.getByText('Loading')
    expect(home).toBeInTheDocument();    
  });
});
