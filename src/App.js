import React from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
import './reset.scss'
import './App.scss'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SearchBar from './components/SearchBar/searchBar'
import TopArtists from './components/TopArtists/topArtists'
import ArtistTracks from './components/ArtistTracks/artistTracks'

const App = () => {
  return (
    <div className='App'>
      <SearchBar />
      <Switch>
        <Route exact path='/artist/:artistID'>
          <ArtistTracks />
        </Route>
        <Route exact path='/topartists/:country/:page'>
          <TopArtists />
        </Route>
      </Switch>
    </div>
  )
}

export default () => {
  return (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  )
}
