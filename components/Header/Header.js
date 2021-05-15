import Head from "next/head"

const Header = ({
  title = false,
  image = false,
  url = false,
  keywords = [],
  description = "PC parts. Simplified."
}) => {
  return (
    <Head>
      <title>{title ? `PartMatcher ${title}` : "PartMatcher"}</title>

      {/* Standard HTML Tags */}
      <meta name="theme-color" content="#14d18c" />
      <meta name="keywords" content={ "pc, parts, computer, components, part, component" + (keywords ? ", " + keywords.join(", ") : "") }/>
      <meta name="rating" content="safe for kids" />
      <meta name="target" content="all" />
      <meta name="audience" content="all" />
      <meta name="coverage" content="Worldwide" />
      <meta name="distribution" content="Global" />
      <meta name="description" content={description} />

      {/* Open Graph */}
      {url && <meta property="og:url" content={url} />}
      <meta property="og:title" content={title ? `PartMatcher ${title}` : "PartMatcher"} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image ? image : "/images/logo128.png"} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title ? `PartMatcher ${title}` : "PartMatcher"} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image ? image : "/images/logo128.png"} />

    </Head>
  )
}

export default Header
