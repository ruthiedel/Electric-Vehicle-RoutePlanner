import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { selectCars } from '../../redux/staticCar/staticCarSelector';
import { useDispatch, useSelector } from 'react-redux';
import { getStaticCars } from '../../service/carstaticService';
import { setCars } from '../../redux/staticCar/staticCarSlice';
import { useEffect } from 'react';

type props={
    selectedCar:any,
    setSelectedCar:any
}

export default function ComboBox(p:props) {
  const dispatch = useDispatch();
  const staticCars = useSelector(selectCars);
 

  async function getData() {
    try{
    const staticCars2 = await getStaticCars();
    dispatch(setCars(staticCars2));
    }
    catch{
      alert('an error occurd')
    }
  }

  useEffect(() => {
    if (staticCars.length === 0) {
           getData();
    }
  }, [staticCars.length]);

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={staticCars.map((car: { id: any; company: any;model:any }) => ({ id: car.id, company: car.company ,model:car.model}))} // Modify options array to include id and company properties
      value={p.selectedCar}
      onChange={(newValue) => {p.setSelectedCar(newValue);
        console.log(newValue)
    }
    }
      getOptionLabel={(option) => option.company+'   '+option.model} // Specify which property to display in the input field
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Company" />}
    />
  );
}


