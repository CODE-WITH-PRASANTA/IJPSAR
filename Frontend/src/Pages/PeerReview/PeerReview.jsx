import React from 'react'
import PeerReviewBreadcrumb from '../../Components/PeerReviewBreadcrumb/PeerReviewBreadcrumb'
import PeerReviewProcess from '../../Components/PeerReviewProcess/PeerReviewProcess'
import Newsletter from '../../Components/Newsletter/Newsletter'

const PeerReview = () => {
  return (
    <div>
      <PeerReviewBreadcrumb />
        <PeerReviewProcess />
        <Newsletter />
    </div>
  )
}

export default PeerReview
