import axios from "axios";




export const getPlacesData = async (sw, ne) =>{
    let URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'
    try {
        const {data:{data}} = await axios.get(URL, {
            params: {
                bl_latitude: sw.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
                tr_latitude: ne.lat,
            },
            headers: {
                'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
                'x-rapidapi-key': '605d0d5cf9msh34f14d647a10160p116559jsn068316d5a633'
            }
        })
        console.log(data)
        return data
    }catch(error){
        console.log(error)
    }
}
