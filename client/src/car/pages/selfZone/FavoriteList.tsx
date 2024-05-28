



import { selectFavorites } from '../../redux/favorite/favoriteSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFavorite } from '../../redux/favorite/favorite.Slice';
import { deleteFavorite as deleteFavoriteApi, getFavorites } from '../../service/favoriteService';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, List, ListItem, ListItemText, ListItemSecondaryAction } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Favorite } from '../../types/type';

const useStyles = {
  listItem: {
    borderRadius: 5,
    border: '1px solid grey',
    '&:not(:last-child)': {
      marginBottom: 1, 
    },
  },
};

type Props = {
  setFavorite: (favorite: Favorite | null) => void;
  selectedFavorite: Favorite | null
};

export default function FavoritesList(p: Props) {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const classes = useStyles;



  const handleDelete = async (id: number) => {
    try {
      await deleteFavoriteApi(id);
      dispatch(deleteFavorite(id));
    }
    catch {
      alert('an error occurd')
    }
  };
  const handleUpdate = (favorite: Favorite) => {
    try {
      if (p.selectedFavorite != null && p.selectedFavorite == favorite) {
        p.setFavorite(null)
      }
      else {
        p.setFavorite(favorite)
      }
    } catch {
      alert('an error occurd')
    }

  }

  return (
    <div style={{ width: '50%', marginLeft: '25%' }}>
      <List>
        {favorites.map((favorite) => (
          <ListItem key={favorite.id} style={classes.listItem}>
            <ListItemText primary={favorite.title} />
            <ListItemText primary={favorite.location} />

            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(favorite.id)}>
                <DeleteIcon fontSize="inherit" />
              </IconButton>
              <IconButton aria-label="update" onClick={() => handleUpdate(favorite)}>
                <ModeEditIcon fontSize="inherit" />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
}

