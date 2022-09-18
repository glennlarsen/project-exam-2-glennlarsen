import React from 'react'
import WifiRoundedIcon from '@mui/icons-material/WifiRounded';
import SpaRoundedIcon from '@mui/icons-material/SpaRounded';
import RoomServiceRoundedIcon from '@mui/icons-material/RoomServiceRounded';
import PoolRoundedIcon from '@mui/icons-material/PoolRounded';
import PetsRoundedIcon from '@mui/icons-material/PetsRounded';
import LocalParkingRoundedIcon from '@mui/icons-material/LocalParkingRounded';
import KitchenRoundedIcon from '@mui/icons-material/KitchenRounded';
import LocalLaundryServiceRoundedIcon from '@mui/icons-material/LocalLaundryServiceRounded';
import HotTubRoundedIcon from '@mui/icons-material/HotTubRounded';
import IronRoundedIcon from '@mui/icons-material/IronRounded';
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';
import FreeBreakfastRoundedIcon from '@mui/icons-material/FreeBreakfastRounded';
import BathtubRoundedIcon from '@mui/icons-material/BathtubRounded';
import AcUnitRoundedIcon from '@mui/icons-material/AcUnitRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

function FacilityIcon({ tags }) {
    const icons = {
        wifi: <WifiRoundedIcon sx={{color:'red'}} />,
        spa: <SpaRoundedIcon sx={{color:'chocolate'}} />,
        roomservice: <RoomServiceRoundedIcon sx={{color:'purple'}} />,
        pool: <PoolRoundedIcon sx={{color:'blue'}} />,
        petfriendly: <PetsRoundedIcon sx={{color:'yellow'}} />,
        parking: <LocalParkingRoundedIcon sx={{color:'turquoise'}} />,
        minibar: <KitchenRoundedIcon sx={{color:'green'}} />,
        laundry: <LocalLaundryServiceRoundedIcon sx={{color:'pink'}} />,
        jacuzzi: <HotTubRoundedIcon sx={{color:'lightBlue'}} />,
        iron: <IronRoundedIcon sx={{color:'maroon'}} />,
        gym: <FitnessCenterRoundedIcon sx={{color:'orange'}} />,
        breakfast: <FreeBreakfastRoundedIcon sx={{color:'lightGreen'}} />,
        bathtub: <BathtubRoundedIcon sx={{color:'darkBlue'}} />,
        ac: <AcUnitRoundedIcon sx={{color:'greenyellow'}} />,
        frontdesk: <SupportAgentRoundedIcon sx={{color:'teal'}} />,
    }

    const facilityTagWithIcon = (tags || []).find(tag => icons[tag.toLowerCase()])

    const facilityIcon = facilityTagWithIcon
    ? icons[facilityTagWithIcon.toLowerCase()]
    : <EditRoundedIcon color='black' />

  return (
    <div className="facilities__item--icon">
    {facilityIcon}
    </div>
  )
}

export default FacilityIcon;