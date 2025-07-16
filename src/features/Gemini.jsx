import axios from "axios"

const geminiResponse = async(command)=>{
    
const config = {
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
        },
    };
    
try {
        const { data } = await axios.post(
            `http://localhost:3000/api/v1/user/askToAssistant`,
            {command},
            config
        );

        return data;
    
    } catch (error) {
      console.log(error || "Something went Wrong") 
    }
}

export default geminiResponse