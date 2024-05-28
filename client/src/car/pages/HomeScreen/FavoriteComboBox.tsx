
import TextField from '@mui/material/TextField';
import Autocomplete, { AutocompleteChangeDetails, AutocompleteChangeReason } from '@mui/material/Autocomplete';
import { useSelector } from 'react-redux';
import { selectFavorites } from '../../redux/favorite/favoriteSelectors';
import { Favorite } from '../../types/type';
import { SyntheticEvent } from 'react';

interface Props {
    isOrigin: boolean,
    handlePlaceSelected: (lat1: number, lng1: number, isOrigin: boolean, name: string) => void,
    mTop: string,
    s: string
}

export default function FavoriteComboBox(props: Props) {
    const userFavorites = useSelector(selectFavorites);
    const handleChange = (event: SyntheticEvent<Element, Event>, value: any, reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<any> | undefined) => {
        try {
            if (userFavorites != undefined) {
                const favoriteId = value?.id;
                const f = userFavorites.find(favorite => favorite.id === favoriteId);
                if (f) {
                    const selectedPos =
                    {
                        lat: f.lat || 0,
                        lng: f.long || 0,
                    };
                    props.handlePlaceSelected(selectedPos.lat, selectedPos.lng, props.isOrigin, f.location);
                }
            }
        }
        catch {
            alert("an error occurd")
        }
    }

    return (
        <Autocomplete
            style={{
                width: `100%`,
                height: `20px`,
                padding: `0 12px`,
                position: "relative",
                right: "0%",
                marginRight: "0%",
                marginTop: props.mTop
            }}
            disablePortal
            id="combo-box-demo"
            options={userFavorites!.map((favorite: Favorite) => ({ id: favorite.id, title: favorite.title, loc: favorite.location }))}
            onChange={handleChange}
            getOptionLabel={(option) => option.title + " " + option.loc}
            renderInput={(params) => <TextField {...params} label={props.s} />}
            sx={{
                '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
                    backgroundColor: 'white',
                },
            }}
        />
    )
}



