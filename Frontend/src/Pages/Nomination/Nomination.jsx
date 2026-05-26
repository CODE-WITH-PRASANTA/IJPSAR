import React from 'react'
import NominationHome from '../../Components/NominationHome/NominationHome'
import NominationBestPaper from '../../Components/NominationBestPaper/NominationBestPaper'
import NominationSub from '../../Components/NominationSub/NominationSub'

const Nomination = () => {
  return (
    <div>
        <NominationHome/>
        <NominationBestPaper/>
        <NominationSub/>
    </div>
  )
}

export default Nomination