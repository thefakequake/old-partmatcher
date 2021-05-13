import Head from "next/head"

const Header = ({
  title = false,
  image = false,
  url = false,
  keywords = []
}) => {
  return (
    <Head>
      <title>{title ? `PartMatcher ${title}` : "PartMatcher"}</title>
      <meta
        property="og:title"
        content={title ? `PartMatcher ${title}` : "PartMatcher"}
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content={image ? image : "/images/logo128.png"}
      />
      {url && <meta property="og:url" content={url} />}
      <meta property="theme-color" content="#14d18c" />
      <meta
        name="keywords"
        content={
          "pc, parts, computer, components, part, component" +
          (keywords ? ", " + keywords.join(", ") : "")
        }
      />
      <meta name="rating" content="safe for kids" />
      <meta name="target" content="all" />
      <meta name="audience" content="all" />
      <meta name="coverage" content="Worldwide" />
      <meta name="distribution" content="Global" />
    </Head>
  )
}

export default Header
