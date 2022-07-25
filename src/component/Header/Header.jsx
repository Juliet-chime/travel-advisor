import React from 'react'
import { Autocomplete } from '@react-google-maps/api'
import {AppBar,Toolbar, Typography, InputBase, Box} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import useStyles from'./style'
import { useState } from 'react'


const Header = ({setCoordinate}) => {
    const classes = useStyles()
    const [autocomplete, setAutocomplete] = useState(null)

    const onLoad = (autoC)=> setAutocomplete(autoC)
    const onPlaceChanged = (autoC)=> {
const lat = autocomplete.getPlace().geometry.location.lat()
const lng = autocomplete.getPlace().geometry.location.lng()
setCoordinate({lat,lng})
    }

  return (
    <AppBar position='static' style={{marginBottom:'10px'}}>
        <Toolbar className={classes.toolbar}>
            <Typography variant='h6' className={classes.title}>
                Travel Advisor
            </Typography>
            <Box display='flex'>
                <Typography variant='h6' className={classes.title}>
Explore New Places
                </Typography>
                <Autocomplete
                onLoad={onLoad}
                onPlaceChanged={onPlaceChanged}
                >
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <InputBase placeholder='Search...' classes={{root:classes.inputRoot, input:classes.inputInput}}/>
                    </div>
                </Autocomplete>
            </Box>
        </Toolbar>
    </AppBar>
  )
}

export default Header