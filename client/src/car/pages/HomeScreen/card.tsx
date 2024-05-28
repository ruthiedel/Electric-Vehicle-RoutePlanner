import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

type props ={
    item:{point:{lat:number,lng:number},name:string,distance:number}
}

  export default function BasicCard(p:props) {
    return (
      <Card sx={{width:'230px',marginTop:'14px', backgroundColor:'#1976d2', color:'white' }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 ,backgroundColor:'#1976d2', color:'white' }} color="text.secondary" gutterBottom>
           {p.item.name}
          </Typography>
          <Typography variant="h5" component="div">
           This will take you -
          </Typography>
          <Typography sx={{ mb: 1.5 ,backgroundColor:'#1976d2', color:'white'}} color="text.secondary">
            {p.item.distance} meters
          </Typography>
        </CardContent>
      </Card>
    );
  }