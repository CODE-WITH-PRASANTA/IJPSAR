import React from 'react'
import SearchArticleHome from '../../Components/SearchArticleHome/SearchArticleHome'
import AuthorArchive from '../../Components/AuthorArchive/AuthorArchive'
import SearchSub from '../../Components/SearchSub/SearchSub'

const SearchArticle = () => {
  return (
    <div>
        <SearchArticleHome/>
       <AuthorArchive/>
       <SearchSub/>
    </div>
  )
}

export default SearchArticle