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
      <meta
        property="og:title"
        content={title ? `PartMatcher ${title}` : "PartMatcher"}
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content={image ? image : "/images/logo128.png"}
      />
      <meta />
      {url && <meta property="og:url" content={url} />}
      <meta property="theme-color" content="#14d18c" />
      <meta
        name="keywords"
        content={
          "pc, parts, computer, components, part, component" +
          (keywords ? ", " + keywords.join(", ") : "")
        }
      />
      <meta property="rating" content="safe for kids" />
      <meta property="target" content="all" />
      <meta property="audience" content="all" />
      <meta property="coverage" content="Worldwide" />
      <meta property="distribution" content="Global" />
      <meta property="description" content="PC parts. Simplified." />
    </Head>
  )
}

export default Header
