import { useFormContext } from "react-hook-form";

import { HotelFormData } from "./ManageHotelForm";


const GuestsSection=()=>{
    const {register,formState:{errors}}=useFormContext<HotelFormData>();

    return (
        <div className="flex"> 
            <label >
                
            </label>
        </div>
    )

}
export default GuestsSection;