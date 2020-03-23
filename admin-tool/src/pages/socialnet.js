import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import Content from 'components/Content'
//import RiskDashboard from 'components/RiskDashboard'
import Social from 'components/SocialNet'


function SocialNet({ data, location }) {
    
	const pageTitle = 'InsureNET Social'; //location ? location.pathname.replace(/\//g, '') : ''
	return (
		<Layout location={location} title={pageTitle}>
			{/** @todo: add the content here for the dashboard */}
            <Social />
            

		</Layout>
	)
}


SocialNet.propTypes = {
	data: PropTypes.object.isRequired,
	location: PropTypes.object,
}


export default SocialNet
