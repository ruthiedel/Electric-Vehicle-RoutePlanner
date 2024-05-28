
import { useDispatch, useSelector } from 'react-redux';
import{selectCars} from '../../redux/Car/carSelector'
import {deleteCar as deleteCarApi , getCars } from '../../service/carService'
import {deleteCar } from '../../redux/Car/carSlice'
import { IconButton, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
import { useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';


const useStyles ={
  
    listItem: {
      borderRadius: 5,
      border: `1px solid grey`,
      '&:not(:last-child)': {
        marginBottom: 1,
        padding:'5px' // Add space between list items
      },
    },
  };


export default function UserCar()
{
  debugger
    const dispatch = useDispatch();
    const cars2 = useSelector(selectCars);
    const classes = useStyles; 

       useEffect(() => {
            console.log(""+cars2)
    }, []);
    
    const handleDelete=async(id:number)=>
    {
      try{
       await deleteCarApi(id)
       dispatch(deleteCar(id))
      }
      catch{
        alert('an error occurd')
      }
    }

    return    <>
    
    <div style={{width:'50%',marginLeft:'25%'}}>
      <List>
        {cars2?.map((car) => (
          <ListItem key={car.id} style={classes.listItem}>
            <ListItemText primary={car.name} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(car.id)}>
              <DeleteIcon fontSize="inherit" />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      </div>
  </>
}