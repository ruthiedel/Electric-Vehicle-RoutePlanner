import CarAutoComplete from "./carAutocomplete"
import { Box } from '@mui/material';
import Carlist from './carList'

export default function UserCar() {

    return <>

        <div >
        <CarAutoComplete />
        </div>
        <br></br>
        <Box sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 'h6.fontSize', fontStyle: 'oblique', m: 1 }}>
            Your Cars
        </Box>
        <Carlist />
    </>


}