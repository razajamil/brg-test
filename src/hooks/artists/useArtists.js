import { useDispatch, useSelector } from 'react-redux'
import artistsEntity, {
  topArtistsSelector,
  artistTopTracksSelector
} from '../../entities/artists'
import { stringHasValue } from '../../helpers'

const useArtists = () => {
  const dispatch = useDispatch()
  const {
    top_artists,
    get_top_artists_request,
    get_top_artists_api_status
  } = useSelector(topArtistsSelector)

  const { artist_top_tracks, get_artist_top_tracks_api_status } = useSelector(
    artistTopTracksSelector
  )

  const getTopArtists = ({ country, page, resultsPerPage }) => {
    dispatch(
      artistsEntity.getTopArtists.action({ country, page, resultsPerPage })
    )
  }

  const getArtistTopTracks = ({ artistID }) => {
    if (stringHasValue(artistID))
      dispatch(artistsEntity.getArtistTopTracks.action({ artistID }))
  }

  return {
    top_artists,
    get_top_artists_request,
    get_top_artists: getTopArtists,
    get_top_artists_api_status,
    get_artist_top_tracks: getArtistTopTracks,
    get_artist_top_tracks_api_status,
    artist_top_tracks
  }
}

export default useArtists
