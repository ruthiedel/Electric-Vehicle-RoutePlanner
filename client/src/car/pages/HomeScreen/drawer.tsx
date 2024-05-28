
import { Drawer, List, ListItem } from '@mui/material';
import { useState, useRef } from "react"
import UserCarComboBox from "./UserCarCombobox"
import { Car } from "../../types/type"
import FavoriteComboBox from '../HomeScreen/FavoriteComboBox';



type promp = {
    handleFavoriteSelect: (lat1: number, lng1: number, isOrigin: boolean, name: string) => void,
    handlePlaceSelect: (place: google.maps.places.PlaceResult, isOrigin: boolean) => void,
    HandleSelectedCar: (e: Car | null | undefined) => void,
    selectedCar: Car | null | undefined,
}


export default function PersistentDrawer(p: promp) {
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <>
            <div
                onClick={toggleDrawer}
                style={{
                    width: '50px',
                    backgroundColor: '#1976d2',
                    color:'white',
                    cursor: 'pointer',
                    padding: '10px',
                    position: 'fixed',
                    top: '50%',
                    right: open ? '350px' : '12px', 
                    transform: 'translateY(-50%)', 
                    transition: 'right 0.3s ease', 
                    zIndex: 1000,
                    writingMode: 'vertical-rl',
                    textOrientation: 'upright', 
                    textAlign: 'center', 
                }}
            >
                open here
            </div>
            <Drawer
                variant="persistent"
                anchor="right"
                open={open}
                sx={{
                    width: '300px',

                    '& .MuiDrawer-paper': {
                        width: '350px',
                        boxSizing: 'border-box',
                        backgroundColor: '#1976d2'
                    }

                }}
            >
                <List>

                    <ListItem >
                        <FavoriteComboBox handlePlaceSelected={p.handleFavoriteSelect} isOrigin={true} mTop='13%' s='choose your favorite origin' />

                    </ListItem>
                    <ListItem >
                        <FavoriteComboBox handlePlaceSelected={p.handleFavoriteSelect} isOrigin={false} mTop='18%' s='choose your favorite destination' />

                    </ListItem>
                    <ListItem >
                        <UserCarComboBox selectedCar={p.selectedCar} setSelectedCar={p.HandleSelectedCar} />
                    </ListItem>


                </List>
            </Drawer>
        </>
    );
}






