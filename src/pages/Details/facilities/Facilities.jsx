import React from 'react'
import Heading from 'components/typography/Heading';
import FacilityIcon from './FacilityIcon';

function Facilities({heading, facilities}) {

  const facilitiesArray = facilities

  return (
      <>
    <Heading level={2}>{heading}</Heading>
    <div className="facilities">
      {facilitiesArray.map((facility) => {
        const { name, tags } = facility.attributes;
        return (
          <div key={facility.id} className="facilities__item">
          <FacilityIcon tags={[tags]} />
          <span>{name}</span>
          </div>
        )
      })}
    </div>
    </>
  )
}

export default Facilities;