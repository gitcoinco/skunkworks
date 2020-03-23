import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'components/Layout'
import EtherscanContent from 'components/EtherscanContent'

function EtherscanPage({ location }) {
    const pageTitle = location ? location.pathname.replace(/\//g, '') : '';

    return (
        <Layout location={location} title={pageTitle}>
            <EtherscanContent />
        </Layout>
    )
}

EtherscanPage.PropTypes = {
    location: PropTypes.object,
}

export default EtherscanPage