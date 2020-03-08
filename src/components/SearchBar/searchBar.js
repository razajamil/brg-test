import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { makeStyles, Paper, InputBase, IconButton } from '@material-ui/core'
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
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  }
}))

const SearchBar = () => {
  const { get_top_artists_request } = useArtists()

  const [country, setCountry] = useState('')

  let history = useHistory()

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

  useEffect(() => {
    if (!stringHasValue(country)) setCountry(get_top_artists_request.country)
  }, [get_top_artists_request.country])

  const classes = useStyles()

  return (
    <div>
      <Paper component='div' className={classes.root}>
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
    </div>
  )
}

export default SearchBar
