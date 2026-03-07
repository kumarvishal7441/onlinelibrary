import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import { Provider } from 'react-redux'
import { store } from './store/app'

function App() {
  return (
    <>
    <Provider store={store}>
     <Navbar/>
    <Outlet/>
    </Provider>
    </>
  )
}

export default App