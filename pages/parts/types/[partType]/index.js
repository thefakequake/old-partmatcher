import Image from "next/image"
import Link from "next/link"
import Header from "../../../../components/Header/Header"
import SearchResult from "../../../../components/SearchResult/SearchResult"
import ImageBox from "../../../../components/ImageBox/ImageBox"

import { FaTimes } from "react-icons/fa"
import { useState, useCallback } from "react"
import debounce from "lodash/debounce"

import { connectToDatabase } from "../../../../utils/mongodb"
import parts from "../../parts"

import styles from "./partTypePage.module.css"

const partTypes = parts.map((part) => part.toLowerCase().replace(/ /g, "-"))

const partSearchPage = ({ partType, partName, featuredParts }) => {
  const [searchResults, setSearchResults] = useState([])
  const [searchBarFocused, setSearchBarFocused] = useState(false)

  const dobouncedFetch = useCallback(
    debounce(
      (cleanedSearchTerm, partName) =>
        fetch(
          `/api/parts/search/${cleanedSearchTerm}?type=${partName}&limit=10`
        )
          .then((response) => response.json())
          .then(setSearchResults),
      500
    ),
    [setSearchResults]
  )

  const handleChange = (event) => {
    const searchTerm = event.target.value
    if (!searchTerm) setSearchResults([])
    if (searchTerm < 1) return

    const cleanedSearchTerm = searchTerm.replace(/=/g, "").replace(/&/g, "")

    dobouncedFetch(cleanedSearchTerm, partName)
  }

  return (
    <>
      <Header title={partName} />
      <div className={styles.partTypePage}>
        <h1 className={styles.partName}>Parts: {partName}</h1>
        <input
          className={styles.partInput}
          type="text"
          placeholder={`Search parts: ${partName}`}
          spellCheck="false"
          onChange={handleChange}
          onFocus={() => {
            setSearchBarFocused(true)
          }}
        />
        {searchBarFocused && (
          <FaTimes
            className={styles.closeIcon}
            onClick={() => {
              setSearchBarFocused(false)
            }}
          />
        )}

        <div
          tabIndex="0"
          className={`${styles.searchResults} ${
            searchBarFocused ? styles.focused : ""
          }`}
        >
          {searchResults.length > 0 ? (
            searchResults.map((part, count) => (
              <SearchResult key={count} part={part} />
            ))
          ) : (
            <h2>No results.</h2>
          )}
        </div>
        <div className={styles.featuredBox}>
          <h1 align="center" className={styles.featuredText}>
            Featured Parts
          </h1>
          <div
            className={
              styles.featuredParts +
              " " +
              (featuredParts.length > 0 ? "" : styles.noFeatured)
            }
          >
            {featuredParts.length > 0 ? (
              featuredParts.map((part, count) => (
                <Link href={`/parts/${part.part_id}`}>
                  <a className={styles.featuredLink}>
                    <div className={styles.featuredPart} key={count}>
                      <ImageBox>
                        <Image
                          src={part.images[0]}
                          width="150px"
                          height="150px"
                        />
                      </ImageBox>
                      <h2>{part.name}</h2>
                    </div>
                  </a>
                </Link>
              ))
            ) : (
              <h3>No featured parts.</h3>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async (context) => {
  const partType = context.params.partType
  const partName = parts[partTypes.indexOf(partType)]

  const { db } = await connectToDatabase(0)
  let featuredParts = []

  if (!partName) {
    context.res.statusCode = 302
    context.res.setHeader("location", "/404")
    context.res.end()
    return { props: {} }
  }

  featuredParts = await db
    .collection("Parts")
    .find({ type: partName, featured: true }, { projection: { _id: 0 } })
    .limit(20)
    .toArray()

  return {
    props: {
      partType: partType,
      partName: partName,
      featuredParts: featuredParts
    }
  }
}

export default partSearchPage
