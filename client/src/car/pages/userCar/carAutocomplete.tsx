import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CarComboBox from './CarComoBox'
import { useDispatch, useSelector } from 'react-redux';
import { addCar as addCarAPI } from '../../service/carService'
import { addCar } from '../../redux/Car/carSlice'
import { TextField } from '@mui/material';
import { selectAuth } from '../../redux/auth/auth.selectors'
import { ChangeEvent, useState } from 'react';
import { selectCars } from '../../redux/Car/carSelector';

export default function CarAutoComplete() {
  const dispatch = useDispatch();

  const [selectedCar, setSelectedCar] = useState<any>(null); // Change state type to string | null
  const [title, setTitle] = useState<string>('');
  const currentUser = useSelector(selectAuth)
  const onAdd = async () => {
    try {
      let car = await addCarAPI({
        name: title,
        staticCarId: selectedCar?.id,
        userId: currentUser!.user!.id
      })
      dispatch(addCar(car))
      setTitle('')
      setSelectedCar(null)
    }
    catch {
      alert('an error occurd')
    }
  }
  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setTitle(e.target.value);
    }
    catch {
      alert('an error occurd')
    }
  };

  return <>


    <div className="container mt-5">
      <div className="d-flex justify-content-center">
        <div className="col-md-6">
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
            <CarComboBox selectedCar={selectedCar} setSelectedCar={setSelectedCar} />
          </div>
          <TextField
            id="formTitle"
            label="Title"
            type="text"
            placeholder="Enter your car title"
            fullWidth
            value={title}
            onChange={handleChangeTitle}
            style={{ marginTop: '16px' }}
          />
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
            <BasicButtons OnClickFunction={onAdd} />
          </div>
        </div>
      </div>
    </div>
  </>
}


type props = {
  OnClickFunction: () => void
}

function BasicButtons(p: props) {

  return (
    <Stack spacing={2} direction="row">

      <Button variant="contained" onClick={p.OnClickFunction}>Add</Button>

    </Stack>
  );
}