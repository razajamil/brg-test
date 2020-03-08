import { toEntityAPIAction } from '../redux/actions/entityActions'
import { getTopArtistsByCountry, getArtistTopTracks } from '../api/artistsAPI'
import { objectHasValue, arrayHasValue, stringHasValue } from '../helpers'

export const ARTISTS = 'artists'

const artists = {
  id: ARTISTS,
  initialState: {
    top_artists: {},
    get_top_artists_request: {
      country: '',
      current_page: 0,
      results_per_page: 0,
      max_pages: 0
    },
    get_top_artists_api_status: {
      loading: false,
      success: false,
      error: ''
    },

    artist_top_tracks: {},

    get_artist_top_tracks_api_status: {
      loading: false,
      success: false,
      error: ''
    }
  },
  getTopArtists: {
    apiCall: getTopArtistsByCountry,
    action: ({ country, page, resultsPerPage }) =>
      toEntityAPIAction(
        {
          payload: { country, page, resultsPerPage },
          type: 'getTopArtists'
        },
        ARTISTS
      ),
    loading: {
      reducer: (state, action) => {
        const { country, page, resultsPerPage } = action.payload

        state.top_artists = {}
        state.get_top_artists_api_status = {
          loading: true,
          success: false,
          error: ''
        }
        state.get_top_artists_request = {
          country: country,
          current_page: page,
          results_per_page: resultsPerPage,
          max_pages: -1
        }
      }
    },
    success: {
      reducer: (state, action) => {
        const { payload } = action
        const { entityActionParams } = action.meta

        if (
          objectHasValue(payload) &&
          objectHasValue(payload.data) &&
          objectHasValue(payload.data.topartists) &&
          arrayHasValue(payload.data.topartists.artist) &&
          objectHasValue(entityActionParams) &&
          !isNaN(entityActionParams.page)
        ) {
          const request_info = payload.data.topartists['@attr']

          state.top_artists = [...payload.data.topartists.artist]
          state.get_top_artists_request = {
            country: request_info.country,
            current_page: parseInt(request_info.page),
            results_per_page: parseInt(request_info.perPage),
            max_pages: parseInt(request_info.totalPages)
          }
        }

        state.get_top_artists_api_status = {
          loading: false,
          success: true,
          error: ''
        }
      }
    },
    error: {
      reducer: (state, action) => {
        state.get_top_artists_api_status = {
          loading: false,
          success: false,
          error: 'api error'
        }
      }
    }
  },

  getArtistTopTracks: {
    apiCall: getArtistTopTracks,
    action: ({ artistID, artistName }) =>
      toEntityAPIAction(
        {
          payload: { artistID, artistName },
          type: 'getArtistTopTracks'
        },
        ARTISTS
      ),
    loading: {
      reducer: (state, action) => {
        const { artistID, artistName } = action.payload

        state.artist_top_tracks = {}

        state.get_artist_top_tracks_api_status = {
          loading: true,
          success: false,
          error: ''
        }
      }
    },
    success: {
      reducer: (state, action) => {
        const { payload } = action
        const { entityActionParams } = action.meta

        if (
          objectHasValue(payload) &&
          objectHasValue(payload.data) &&
          objectHasValue(payload.data.toptracks) &&
          arrayHasValue(payload.data.toptracks.track) &&
          objectHasValue(entityActionParams)
        ) {
          state.artist_top_tracks = {
            name: payload.data.toptracks.track[0].artist.name,
            tracks: [...payload.data.toptracks.track]
          }
        }
        state.get_artist_top_tracks_api_status = {
          loading: false,
          success: true,
          error: ''
        }
      }
    },
    error: {
      reducer: (state, action) => {
        state.artist_top_tracks = {}
        state.get_artist_top_tracks_api_status = {
          loading: false,
          success: false,
          error: 'api error'
        }
      }
    }
  }
}

export default artists

export const topArtistsSelector = state => {
  return {
    top_artists: state[ARTISTS].top_artists,
    get_top_artists_request: state[ARTISTS].get_top_artists_request,
    get_top_artists_api_status: state[ARTISTS].get_top_artists_api_status
  }
}

export const artistTopTracksSelector = state => {
  return {
    artist_top_tracks: state[ARTISTS].artist_top_tracks,
    get_artist_top_tracks_api_status:
      state[ARTISTS].get_artist_top_tracks_api_status
  }
}
