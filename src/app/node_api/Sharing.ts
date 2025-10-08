import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:5000"
})

export const generateSessionCode = async() =>{
  try{
    const response = await api.get("/generate_session_code");
    return response.data;
  }catch(error){
    console.log("Error while generating Session Code", error)
  }
}