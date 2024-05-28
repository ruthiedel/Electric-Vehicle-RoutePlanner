import  { useState } from 'react';
import { Kategory } from '../../types/type';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useSelector } from 'react-redux';
import { selectKategories } from '../../redux/kategory/kategory.selector';
import { getRestRequest} from "../../service/algorithm"
import UpgradeIcon from '@mui/icons-material/Upgrade';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

type props = {
    selectedKategory: string[],
    setSelectedKategory: (kategory: string[]) => void,
    setLoading:(load:boolean)=>void,
    chargePoints : {lat:number,lng:number}[],
    setRestPoints: (restPoints:{point:{lat:number,lng:number},distance:number,name:string}[]) => void
    
}

function getStyles(name: string, personName: string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function KategorysComboBox(p: props) {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const kategories = useSelector(selectKategories)
    


    const handleChange = (event: SelectChangeEvent<typeof p.selectedKategory>) => {
        try{
        const {
            target: { value },
        } = event;

        p.setSelectedKategory(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        }
        catch{
            alert('an error occurd')
        }
    };
    
    const handleOpen = () => {

        setOpen(true);
    };

    const handleClose = () => {
        p.setSelectedKategory([]); // איפוס הערך הנבחר
        setOpen(false);
    };
    const handleSubmit = async () =>
    {
        console.log("charge points:" ,p.chargePoints.length)
        console.log("kategory",kategories.length)
      if(p.chargePoints.length-1<=p.selectedKategory.length) 
        { 
         p.setLoading(true)
         const response = await getRestRequest({point:p.chargePoints,kategories:p.selectedKategory})
         p.setLoading(false)
         p.setRestPoints(response)
         handleClose()
        }
        else
        {
            alert("you need to choose at list "+(p.chargePoints.length-1) + " kategories")
        }
    }
    return (
        <div>
            <Button onClick={handleOpen}>Upgraded route</Button>
            <UpgradeIcon></UpgradeIcon>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Choose Kategories</DialogTitle>
                <DialogContent>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <Select
                            multiple
                            displayEmpty
                            value={p.selectedKategory}
                            onChange={handleChange}
                            input={<OutlinedInput />}
                            renderValue={(selected) => {
                                if (selected?.length === 0) {
                                    return <em>Choose kategories</em>;
                                }

                                return selected?.join(',');
                            }}
                            MenuProps={MenuProps}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >

                            {kategories.map((kategory: Kategory) => (
                                <MenuItem
                                    key={kategory.id}
                                    value={kategory.name}
                                    style={getStyles(kategory.name, p.selectedKategory, theme)}
                                >
                                    {kategory.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

