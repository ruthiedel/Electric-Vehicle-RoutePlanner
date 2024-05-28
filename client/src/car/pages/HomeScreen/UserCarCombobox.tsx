import TextField from '@mui/material/TextField';
import Autocomplete, { AutocompleteChangeDetails, AutocompleteChangeReason } from '@mui/material/Autocomplete';
import { selectCars } from '../../redux/Car/carSelector';
import { useSelector } from 'react-redux';
import { Car } from '../../types/type';
import { SyntheticEvent, useEffect } from 'react';
type props = {
  selectedCar: any,
  setSelectedCar: (car: Car | null | undefined) => void

}

export default function ComboBox(p: props) {
  const userCars = useSelector(selectCars);

  const handleChange = (event: SyntheticEvent<Element, Event>, value: any, reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<any> | undefined) => {
    try {
      const carId = value?.id as number;
      const car = userCars.find(car => car.id === carId);
      p.setSelectedCar(car);
    }
    catch {
      alert('an error occurd')
    }
  }

  useEffect(() => {
    p.setSelectedCar(userCars[0])
  }, [userCars]);



  return (
    <Autocomplete
      style={{

        width: `105%`,
        height: `32px`,
        padding: `0 12px`,
        position: "relative",
        right: "0%",
        marginTop: "18%",
        marginRight: "0%"
      }}
      disablePortal
      id="combo-box-demo"
      defaultValue={userCars[0]}
      options={userCars.map((car) => ({ id: car.id, name: car.name }))}
      onChange={handleChange}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => <TextField {...params} label="choose car" />}
      sx={{
        '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
          backgroundColor: 'white', // צבע רקע לבן גם לתיבת הקלט
        },
      }}
    />
  );
}


