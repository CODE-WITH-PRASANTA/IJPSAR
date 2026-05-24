import React from 'react'
import ContactFrom from '../../Components/ContactFrom/ContactFrom'
import ContactBreadcrum from '../../Components/ContactBreadcrum/ContactBreadcrum'
import ContactSub from '../../Components/ContactSub/ContactSub'

const Contact = () => {
  return (
    <div>
        <ContactBreadcrum/>
        <ContactFrom/>
        <ContactSub/>
    </div>
  )
}

export default Contact