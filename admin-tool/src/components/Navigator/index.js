import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import HomeIcon from '@material-ui/icons/Home'
import PeopleIcon from '@material-ui/icons/People'
import DnsRoundedIcon from '@material-ui/icons/DnsRounded'
import PermMediaOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActual'
import PublicIcon from '@material-ui/icons/Public'
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet'
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent'
import TimerIcon from '@material-ui/icons/Timer'
import SettingsIcon from '@material-ui/icons/Settings'
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup'
import Logo from 'components/Logo'

const categories = [
	{
		id: 'Administration',
		children: [
			{ id: 'Authentication', icon: <PeopleIcon />, page: 'authentication' },
			{ id: 'Hosting', icon: <PublicIcon />, page: 'hosting' },
			
		],
	},
	{
		id: 'Social Network',
		children: [
			{ id: 'InsureNET Social', icon: <PeopleIcon />, page: 'socialnet' }
		]
	},
	{
		id: 'dApps',
		children: [
			{ id: 'dApp Browser', icon: <PeopleIcon />, page: 'browser' },
		]
	},
	{
		id: 'Wallets',
		children: [

		]
	},
	{
		id: 'Exchanges',
		children: [
			{ id: 'iNET Exchange', icon: <PublicIcon />, page: 'exchange' },
		]
	},
	{
		id: 'Risk Models',
		children: [
			{ id: 'RiskDashboard', icon: <DnsRoundedIcon />, page: 'riskdashboard' },
		]
	},
	{
		id: 'Smart Contracts',
		children: [

		]
	},
	
	// {
	// 	id: 'AI & ML',
	// 	children: [
	// 		{ id: 'ML Kit', icon: <SettingsInputComponentIcon />, page: 'ml' },
	// 	]
	// },
	{
		id: 'Storage',
		children: [
			{ id: 'Database', icon: <DnsRoundedIcon />, page: 'database' },
			{ id: 'IPFS', icon: <SettingsEthernetIcon/>, page: 'ipfs' },
			{ id: 'Storage', icon: <PermMediaOutlinedIcon />, page: 'storage' },
		]
	},
	{
		id: 'Reporting',
		children: [
			{ id: 'Etherscan', icon: <SettingsInputComponentIcon/>, page: 'etherscan' },
			{ id: 'Analytics', icon: <SettingsIcon />, page: 'analytics' },
			{ id: 'Performance', icon: <TimerIcon />, page: 'performance' },
		],
	},
	{
		id: 'Testing',
		children: [
			{ id: 'Test Lab', icon: <PhonelinkSetupIcon />, page: 'lab' },
			{ id: 'Functions', icon: <SettingsEthernetIcon />, page: 'functions' },
		]
	}
]

const styles = theme => ({
	categoryHeader: {
		paddingTop: 16,
		paddingBottom: 16,
	},
	categoryHeaderPrimary: {
		color: theme.palette.common.white,
	},
	item: {
		paddingTop: 4,
		paddingBottom: 4,
		color: 'rgba(255, 255, 255, 0.7)',
	},
	itemCategory: {
		backgroundColor: '#232f3e',
		boxShadow: '0 -1px 0 #404854 inset',
		paddingTop: 16,
		paddingBottom: 16,
	},
	firebase: {
		fontSize: 24,
		fontFamily: theme.typography.fontFamily,
		color: theme.palette.common.white,
	},
	itemActionable: {
		'&:hover': {
			backgroundColor: 'rgba(255, 255, 255, 0.08)',
		},
	},
	itemActiveItem: {
		color: '#4fc3f7',
	},
	itemPrimary: {
		color: 'inherit',
		fontSize: theme.typography.fontSize,
		'&$textDense': {
			fontSize: theme.typography.fontSize,
		},
	},
	textDense: {},
	divider: {
		marginTop: theme.spacing.unit * 2,
	},
})

function Navigator({ classes, location = null, ...rest }) {
	const matchPath = location ? location.pathname.replace(/\//g, '') : null
	return (
		<Drawer variant="permanent" {...rest}>
			<List disablePadding>
				<ListItem className={classNames(classes.firebase, classes.item, classes.itemCategory)}>
					<Grid container alignItems="center" spacing={8} direction="row">
						<Grid item>
							<Logo />
						</Grid>
						<Grid item>InsureNET</Grid>
					</Grid>
				</ListItem>

				<Link style={{ textDecoration: 'none', color: 'inherit' }} to="/">
					<ListItem className={classNames(classes.item, classes.itemCategory)}>
						<ListItemIcon>
							<HomeIcon />
						</ListItemIcon>
						<ListItemText
							classes={{
								primary: classes.itemPrimary,
							}}
						>
							Project Overview
						</ListItemText>
					</ListItem>
				</Link>
				{categories.map(({ id, children }) => (
					<React.Fragment key={id}>
						<ListItem className={classes.categoryHeader}>
							<ListItemText
								classes={{
									primary: classes.categoryHeaderPrimary,
								}}
							>
								{id}
							</ListItemText>
						</ListItem>
						{children.map(({ id: childId, icon, page = null }) => {
							return page ? (
								<Link
									key={childId}
									style={{ textDecoration: 'none', color: 'inherit' }}
									to={`/${page}`}
								>
									<ListItem
										button
										dense
										className={classNames(
											classes.item,
											classes.itemActionable,
											(matchPath && page ? matchPath === page : false) && classes.itemActiveItem
										)}
									>
										<ListItemIcon>{icon}</ListItemIcon>
										<ListItemText
											classes={{
												primary: classes.itemPrimary,
												textDense: classes.textDense,
											}}
										>
											{childId}
										</ListItemText>
									</ListItem>
								</Link>
							) : (
								<div />
							)
						})}
						<Divider className={classes.divider} />
					</React.Fragment>
				))}
			</List>
		</Drawer>
	)
}

Navigator.propTypes = {
	classes: PropTypes.object.isRequired,
	location: PropTypes.object,
}

export default withStyles(styles)(Navigator)
