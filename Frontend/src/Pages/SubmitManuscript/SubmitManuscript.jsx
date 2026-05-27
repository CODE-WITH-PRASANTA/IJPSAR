import React from 'react'
import SubmitManuscriptBreadcrumb from '../../Components/SubmitManuscriptBreadcrumb/SubmitManuscriptBreadcrumb'
import SubmitManuscriptSec from '../../Components/SubmitManuscriptSec/SubmitManuscriptSec'
import Newsletter from '../../Components/Newsletter/Newsletter'

const SubmitManuscript = () => {
  return (
    <div>
      <SubmitManuscriptBreadcrumb />
        <SubmitManuscriptSec />
        <Newsletter />
    </div>
  )
}

export default SubmitManuscript
