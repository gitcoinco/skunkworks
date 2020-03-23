import React from 'react';
import PropTypes from 'prop-types';
import Layout from 'components/Layout'
import IpfsContent from 'components/IpfsContent'

function IpfsPage({ location }) {
    const pageTitle = location ? location.pathname.replace(/\//g, '') : '';

    return (
        <Layout location={location} title={pageTitle}>
            <IpfsContent />
        </Layout>
    )
}

IpfsPage.PropTypes = {
    location: PropTypes.object,
}

export default IpfsPage