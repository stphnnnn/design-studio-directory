import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";

const commonMeta = {
  description:
    "An extensive list of design studios from all around the world. Created to support students and designers in their search for internships and full-time employment.",
  image: "",
  twitterHandle: "@DesignStudioDir"
};

function SEO({ title, url = "https://designstudio.directory" }) {
  return (
    <Head>
      <title>{title} | Design Studio Directory</title>
      <meta name="description" content={commonMeta.description} />

      {/* Twitter Card */}
      <meta name="twitter:card" value="summary" />
      <meta name="twitter:site" content={commonMeta.twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={commonMeta.description} />
      <meta name="twitter:image" content={commonMeta.image} />

      {/* Open Graph Data */}
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={commonMeta.image} />
      <meta property="og:description" content={commonMeta.description} />
    </Head>
  );
}

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string
};

export default SEO;
