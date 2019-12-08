import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";

function SEO({ description, lang, meta, title }) {
  return (
    <Head>
      <title>{title} | Design Studio Directory</title>
    </Head>
  );
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired
};

export default SEO;
