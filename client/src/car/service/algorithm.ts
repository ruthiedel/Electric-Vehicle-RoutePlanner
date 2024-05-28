import axios from "../Axiose/axios";

export const getChargingPoints = async (origin:string,destination:string,km:number)=>
    {
        try{
            const response =await axios.get(`/Algorithm/${origin}/${destination}/${km}`)
            const chargingPoints = response.data;
            return chargingPoints;
        }
        catch (error: any) {
            console.log(error)
          }
    }



    export const getRestRequest= async (request:{point:{lat:number,lng:number}[],kategories:string[]})=>
        {
            try
            {
                const req = {
                    ChargePoints: request.point, // המרה לשם שמצפה לו השרת
                    Kategories: request.kategories // המרה לשם שמצפה לו השרת
                };
                debugger
                const response = await axios.post('/Algorithm',req)
                const restPoints = response.data
                return restPoints
            }
            catch (error: any) {
                console.log(error)
              }
        }