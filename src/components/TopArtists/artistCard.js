import React from 'react'
import { makeStyles, Link } from '@material-ui/core'
import { objectHasValue, stringHasValue } from '../../helpers'
import { useHistory } from 'react-router-dom'

import clsx from 'clsx'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    cursor: 'pointer'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  }
}))

const ArtistCard = ({ artist }) => {
  const history = useHistory()

  const handleArtistClick = () => {
    if (objectHasValue(artist) && stringHasValue(artist.mbid))
      history.push(`/artist/${artist.mbid}`)
  }

  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardHeader
        title={artist.name}
        subheader={`${artist.listeners} listeners`}
      />
      <CardMedia
        className={classes.media}
        image={artist.image[3]['#text']}
        title='View tracks'
        onClick={handleArtistClick}
      />
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          <Link target='_blank' href={artist.url}>
            View on Last.fm
          </Link>
        </Typography>
      </CardContent>
    </Card>
  )
}

export default ArtistCard
