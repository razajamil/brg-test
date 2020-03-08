import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import {
  makeStyles,
  Paper,
  InputBase,
  IconButton,
  LinearProgress,
  Button,
  SvgIcon
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import useArtists from '../../hooks/artists/useArtists'
import { stringHasValue } from '../../helpers'

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  homeIcon: {
    cursor: 'pointer'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  }
}))

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' />
    </SvgIcon>
  )
}

const SearchBar = () => {
  const {
    get_top_artists_request,
    get_top_artists_api_status,
    get_artist_top_tracks_api_status
  } = useArtists()

  const [country, setCountry] = useState('')

  let history = useHistory()

  const handleHomeClick = () => {
    history.push('/')
    setCountry('')
  }
  const handleTextChange = event => {
    setCountry(event.target.value)
  }

  const handleSearchClick = () => {
    history.push(`/topartists/${country}/1`)
  }

  const handleKeypress = event => {
    if (event.key === 'Enter') {
      history.push(`/topartists/${country}/1`)
    }
  }

  // on page reload get country from url
  useEffect(() => {
    if (!stringHasValue(country)) setCountry(get_top_artists_request.country)
  }, [get_top_artists_request.country])

  const classes = useStyles()

  return (
    <>
      {(get_top_artists_api_status.loading ||
        get_artist_top_tracks_api_status.loading) && <LinearProgress />}
      <Paper component='div' className={classes.root}>
        <HomeIcon
          color='inherit'
          className={classes.homeIcon}
          title='Home'
          onClick={handleHomeClick}
        />
        <InputBase
          className={classes.input}
          placeholder='Find artists by country'
          inputProps={{ 'aria-label': 'country' }}
          value={country}
          onChange={handleTextChange}
          onKeyPress={handleKeypress}
        />
        <IconButton
          type='submit'
          className={classes.iconButton}
          aria-label='search'
          onClick={handleSearchClick}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </>
  )
}

export default SearchBar
