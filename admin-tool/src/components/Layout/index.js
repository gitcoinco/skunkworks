import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Hidden from '@material-ui/core/Hidden'
import Navigator from 'components/Navigator'

import Header from 'components/Header'

let theme = createMuiTheme({
	typography: {
		useNextVariants: true,
		h5: {
			fontWeight: 500,
			fontSize: 26,
			letterSpacing: 0.5,
		},
	},
	palette: {
		primary: {
			light: '#63ccff',
			main: '#009be5',
			dark: '#006db3',
		},
	},
	shape: {
		borderRadius: 8,
	},
})

theme = {
	...theme,
	overrides: {
		MuiDrawer: {
			paper: {
				backgroundColor: '#18202c',
			},
		},
		MuiButton: {
			label: {
				textTransform: 'initial',
			},
			contained: {
				boxShadow: 'none',
				'&:active': {
					boxShadow: 'none',
				},
			},
		},
		MuiTabs: {
			root: {
				marginLeft: theme.spacing.unit,
			},
			indicator: {
				height: 3,
				borderTopLeftRadius: 3,
				borderTopRightRadius: 3,
				backgroundColor: theme.palette.common.white,
			},
		},
		MuiTab: {
			root: {
				textTransform: 'initial',
				margin: '0 16px',
				minWidth: 0,
				[theme.breakpoints.up('md')]: {
					minWidth: 0,
				},
			},
			labelContainer: {
				padding: 0,
				[theme.breakpoints.up('md')]: {
					padding: 0,
				},
			},
		},
		MuiIconButton: {
			root: {
				padding: theme.spacing.unit,
			},
		},
		MuiTooltip: {
			tooltip: {
				borderRadius: 4,
			},
		},
		MuiDivider: {
			root: {
				backgroundColor: '#404854',
			},
		},
		MuiListItemText: {
			primary: {
				fontWeight: theme.typography.fontWeightMedium,
			},
		},
		MuiListItemIcon: {
			root: {
				color: 'inherit',
				marginRight: 0,
				'& svg': {
					fontSize: 20,
				},
			},
		},
		MuiAvatar: {
			root: {
				width: 32,
				height: 32,
			},
		},
	},
	props: {
		MuiTab: {
			disableRipple: true,
		},
	},
	mixins: {
		...theme.mixins,
		toolbar: {
			minHeight: 48,
		},
	},
}

const drawerWidth = 256

const styles = {
	root: {
		display: 'flex',
		minHeight: '100vh',
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	appContent: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
	},
	mainContent: {
		flex: 1,
		padding: '0px',
	},
}

function Layout({ location, title, children, classes }) {
	// eslint-disable-next-line no-undef
	const [mobileOpen, setMobileOpen] = useState(false)

	return (
		<MuiThemeProvider theme={theme}>
			<div className={classes.root}>
				<CssBaseline />
				<nav className={classes.drawer}>
					<Hidden smUp implementation="js">
						<Navigator
							PaperProps={{ style: { width: drawerWidth } }}
							variant="temporary"
							open={mobileOpen}
							onClose={() => setMobileOpen(!mobileOpen)}
						/>
					</Hidden>
					<Hidden xsDown implementation="css">
						<Navigator PaperProps={{ style: { width: drawerWidth } }} location={location} />
					</Hidden>
				</nav>
				<div className={classes.appContent}>
					<Header onDrawerToggle={() => setMobileOpen(!mobileOpen)} title={title} />
					<main className={classes.mainContent}>{children}</main>
				</div>
			</div>
		</MuiThemeProvider>
	)
}

Layout.propTypes = {
	classes: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired,
	children: PropTypes.object,
}
export default withStyles(styles)(Layout)
