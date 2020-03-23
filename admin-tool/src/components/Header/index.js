import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import HelpIcon from '@material-ui/icons/Help'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsIcon from '@material-ui/icons/Notifications'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

const lightColor = 'rgba(255, 255, 255, 0.7)'

const styles = theme => ({
	secondaryBar: {
		zIndex: 0,
	},
	menuButton: {
		marginLeft: -theme.spacing.unit,
	},
	iconButtonAvatar: {
		padding: 4,
	},
	link: {
		color: lightColor,
		'&:hover': {
			color: theme.palette.common.white,
		},
	},
	button: {
		borderColor: lightColor,
	},
	avatar: {
		img: {
			margin: 0,
		},
	},
})

function Header({ classes, onDrawerToggle, title }) {
	return (
		<>
			<AppBar color="primary" position="sticky" elevation={0}>
				<Toolbar>
					<Grid container spacing={8} alignItems="center">
						<Hidden smUp>
							<Grid item>
								<IconButton
									color="inherit"
									aria-label="Open drawer"
									onClick={onDrawerToggle}
									className={classes.menuButton}
								>
									<MenuIcon />
								</IconButton>
							</Grid>
						</Hidden>
						<Grid item xs />
						<Grid item>
							<Typography className={classes.link} component="a" href="#">
								Go to docs
							</Typography>
						</Grid>
						<Grid item>
							<Tooltip title="Alerts • No alters">
								<IconButton color="inherit">
									<NotificationsIcon />
								</IconButton>
							</Tooltip>
						</Grid>
						<Grid item>
							<IconButton color="inherit" className={classes.iconButtonAvatar}>
								<Avatar className={classes.avatar} src="/images/mockup4.jpg" />
							</IconButton>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
			<AppBar component="div" className={classes.secondaryBar} color="primary" position="static" elevation={0}>
				<Toolbar>
					<Grid container alignItems="center" spacing={8}>
						<Grid item xs>
							<Typography style={{ textTransform: 'capitalize' }} color="inherit" variant="h5">
								{title}
							</Typography>
						</Grid>
						<Grid item>
							<Button className={classes.button} variant="outlined" color="inherit" size="small">
								Web setup
							</Button>
						</Grid>
						<Grid item>
							<Tooltip title="Help">
								<IconButton color="inherit">
									<HelpIcon />
								</IconButton>
							</Tooltip>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
		</>
	)
}

Header.propTypes = {
	classes: PropTypes.object.isRequired,
	onDrawerToggle: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
}

export default withStyles(styles)(Header)
