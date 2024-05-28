
import AutoComplete from "./AutoComplete";
import FavoriteList from "./FavoriteList";
import Box from '@mui/material/Box';
import logo2 from '../../images/צילום מסך 2024-05-13 163929.png';
import { useState } from "react";
import { Favorite } from "../../types/type";
export default function SelfZone() {
  const [selectedFavorite, setSelectedFavorite] = useState<Favorite | null>(null);

  return (
    <div 
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundImage: `url(${logo2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'right',
        
      }}
    >
      <div>
        <AutoComplete selctedUpdateFavorite={selectedFavorite} setSelectedFavorite={setSelectedFavorite}/>
      </div>
      <br />
      <Box sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 'h6.fontSize', fontStyle: 'oblique', m: 1 }}>
        Your Favorites
      </Box>
      <FavoriteList setFavorite={setSelectedFavorite} selectedFavorite={selectedFavorite}/>
    </div>
  );
}




