
import {useState , useEffect} from "react"


export default function Time() {
    const [currtime, setCurrTime] = useState( new Date());


    
    useEffect(() => {
        const intervalId = setInterval(() =>
        {
            setCurrTime(new Date());
        }, 1000)
        return () => clearInterval(intervalId);
         
    }, [])
    
    function formate() {
        let hour = currtime.getHours();
        const minut = currtime.getMinutes();
        const sec = currtime.getSeconds();
        const meridian = hour >= 12 ? "PM" : "AM";

        hour = hour % 12 || 12;

        return `${padZero(hour)}:${padZero(minut)}:${padZero(sec)} ${meridian}`;
    }

    function padZero(number){
        return (number < 10 ? "0" : "") + number;
    }

        
    return (
        <>
        <div className="main-container">
        <h2 >{formate()}</h2>
        </div>
      </>
    );
}