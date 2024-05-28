
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { addFavorite as addFavoriteApi, updateFavorite as updateFavoriteApi } from '../../service/favoriteService';
import { addFavorite, updateFavorite } from '../../redux/favorite/favorite.Slice';
import { useDispatch, useSelector } from 'react-redux';
import { Favorite } from '../../types/type';
import { TextField, Button } from '@mui/material';
import { selectAuth } from '../../redux/auth/auth.selectors';
import { Autocomplete } from '@react-google-maps/api';

type Props = {
    selctedUpdateFavorite: Favorite | null;
    setSelectedFavorite: (favorite: Favorite | null) => void
};
export default function AutoComplete(p: Props) {
    const [location, setLocation] = useState<string>('');
    const [newPlace, setNewPlace] = useState<{ lat: number, lng: number } | null>(null);
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();
    const currentUser = useSelector(selectAuth);
    const placeAutocomplete = useRef<google.maps.places.Autocomplete | null>(null);

    useEffect(() => {
        if (p.selctedUpdateFavorite) {
            setTitle(p.selctedUpdateFavorite.title);
            setLocation(p.selctedUpdateFavorite.location);
            setNewPlace({ lat: p.selctedUpdateFavorite.lat, lng: p.selctedUpdateFavorite.long });
        } else {
            setTitle('');
            setLocation('');
            setNewPlace(null);
        }
    }, [p.selctedUpdateFavorite]);

    const handlePlaceSelect = (place: google.maps.places.PlaceResult) => {
        try {
            const selectedPos = {
                lat: place.geometry?.location?.lat() || 0,
                lng: place.geometry?.location?.lng() || 0,
            };
            setNewPlace(selectedPos);
            setLocation(place.formatted_address || '');
        }
        catch {
            alert('an error occurd')
        }
    };

    const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        try {
            setTitle(e.target.value);
        }
        catch {
            alert('an error occurd')
        }
    };

    const onClickHandle = async () => {
        try {
            if (!p.selctedUpdateFavorite) {
                const value: Favorite = await addFavoriteApi({
                    title: title,
                    lat: newPlace?.lat || 0,
                    long: newPlace?.lng || 0,
                    location: location,
                    userId: currentUser!.user!.id,
                });
                dispatch(addFavorite(value));
            } else {
                const updatedFavorite: Favorite = {
                    ...p.selctedUpdateFavorite,
                    lat: newPlace?.lat || p.selctedUpdateFavorite.lat,
                    long: newPlace?.lng || p.selctedUpdateFavorite.long,
                    location: location,
                    title: title
                };
                await updateFavoriteApi(updatedFavorite);
                dispatch(updateFavorite(updatedFavorite));
                p.setSelectedFavorite(null)
            }
            setTitle('');
            setLocation('');
            setNewPlace(null);
            console.log('pl1:', placeAutocomplete.current);
            placeAutocomplete.current?.setOptions(null);
            console.log('pl2:', placeAutocomplete.current);
        }
        catch {
            alert('an error occurd')
        }

    };
    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-center">
                <div className="col-md-6">
                    <Autocomplete
                        onLoad={(autocomplete: google.maps.places.Autocomplete | null) => {
                            placeAutocomplete.current = autocomplete;
                        }}
                        onPlaceChanged={() => handlePlaceSelect(placeAutocomplete.current?.getPlace()!)}>
                        <TextField
                            type="text"
                            placeholder="Favorite"
                            fullWidth
                            InputProps={{
                                style: {
                                    borderRadius: '3px',
                                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                                },
                            }}
                        />
                    </Autocomplete>


                    <TextField
                        id="formTitle"
                        label="Title"
                        type="text"
                        placeholder="Enter your favorite title"
                        fullWidth
                        value={title}
                        onChange={handleChangeTitle}
                        style={{ marginTop: '16px' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                        {!p.selctedUpdateFavorite ? (
                            <Button variant="contained" color="primary" onClick={onClickHandle}>
                                ADD
                            </Button>
                        ) : (
                            <Button variant="contained" color="primary" onClick={onClickHandle}>
                                UPDATE
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

