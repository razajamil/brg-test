import Axios from 'axios'
import api_config from './api_config'

const responseFormat = 'json'

export const getTopArtistsByCountry = ({ country, page, resultsPerPage }) => {
  return Axios.get(
    `https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&api_key=${api_config.api_key}&country=${country}&page=${page}&limit=${resultsPerPage}&format=${responseFormat}`
  )
}

export const getArtistTopTracks = ({ artistID }) => {
  return Axios.get(
    `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&mbid=${artistID}&page=1&limit=100&api_key=${api_config.api_key}&format=${responseFormat}`
  )
}
