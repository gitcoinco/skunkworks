import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import Content from 'components/Content'
//import RiskDashboard from 'components/RiskDashboard'


function RiskDashboard({ data, location }) {
    
	const pageTitle = 'Risk Dashboard'; //location ? location.pathname.replace(/\//g, '') : ''
	return (
		<Layout location={location} title={pageTitle}>
			{/** @todo: add the content here for the dashboard */}
            {data}
            

		</Layout>
	)
}


RiskDashboard.propTypes = {
	data: PropTypes.object.isRequired,
	location: PropTypes.object,
}


export default RiskDashboard
