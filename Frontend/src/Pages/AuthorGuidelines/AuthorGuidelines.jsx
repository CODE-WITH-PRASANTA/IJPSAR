import React from 'react'
import AuthorGuidelinesBreadcrum from '../../Components/AuthorGuidelinesBreadcrum/AuthorGuidelinesBreadcrum'
import AuthorGuidelinesContent from '../../Components/AuthorGuidelinesContent/AuthorGuidelinesContent'
import Newsletter from '../../Components/Newsletter/Newsletter'

const AuthorGuidelines = () => {
  return (
    <div>
      <AuthorGuidelinesBreadcrum />
        <AuthorGuidelinesContent />
        <Newsletter />
    </div>
  )
}

export default AuthorGuidelines
