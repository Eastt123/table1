import { editPerson, Person } from "@/store/features/personsSlice";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup"
import { AppDispatch } from "@/store/store";
interface EditModalProps{
    person: Person | undefined,
    setEditModal:Dispatch<SetStateAction<boolean>>
}

interface formSubmitProps{
    name:string,
    email:string,
    city:string
}

const schema = yup.object({
    name:yup.string().required("Name is required"),
    city:yup.string().required("Email is required"),
    email:yup.string().required("City is required"),
})

const EditModal = ({setEditModal, person}:EditModalProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const {handleSubmit, register, formState:{errors}} = useForm(
        {   
            defaultValues:{name:person!.name, email:person!.email, city:person!.address.city},
            resolver:yupResolver(schema),
        }
    );
    
    const formSubmit = (data: formSubmitProps) => {
        console.log(1234);
        
        const newPerson = {...person, ["name"]: data.name, 
        ["email"]:data.email, 
        address:{...person?.address, ["city"]:data.city}    
    };
        
        dispatch(editPerson(newPerson as Person));
        setEditModal(false);
    }

    return (
        <div onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
            if((e.target as Element).classList.contains("form-container")){
                setEditModal(false);
            }

        }} className="form-container absolute z-10 left-0 top-0 flex w-full h-full items-center justify-center bg-neutral-300 bg-opacity-50">
        <form className="rounded p-8 bg-white w-96" onSubmit={handleSubmit(formSubmit)} >
            <div className="input-group flex flex-col mb-2 ">
                <div className="h-8" >
                { errors.name ? <label className="text-red-600" >{errors.name.message}</label>  : <label htmlFor="">Name</label>}
                </div>
            <input  
            className="h-10 rounded-sm border-2 border-solid" 
            type="text" 
            id="name" 
            placeholder="Enter Name" 
            {...register("name")}
            />
            </div>
            <div className="input-group flex flex-col  mb-2">
            <div className="h-8" >
                { errors.email ? <label className="text-red-600" >{errors.email.message}</label>  : <label htmlFor="">Email</label>}
                </div>
            <input 
            className="h-10 rounded-sm border-solid border-2" 
            type="Email" 
            id="email" 
            placeholder="Enter Email" 
            {...register("email")}
            />
            </div>
            <div className="input-group flex flex-col mb-2">
            <div className="h-8" >
                { errors.city ? <label className="text-red-600" >{errors.city.message}</label>  : <label htmlFor="">City</label>}
                </div>
            <input 
            className="h-10 
            rounded-sm 
            border-solid border-2" 
            type="text" 
            id="city" 
            placeholder="Enter City"
            {...register("city")}
            />
            </div>
            <div className="my-2" >
                <button className="bg-red-600 w-20 text-white h-10 rounded mr-2" onClick={()=>{setEditModal(false)}}>Cancel</button>
                <button className="bg-green-600 w-20 text-white h-10 rounded" type="submit">Submit</button>
            </div>
        </form>
        </div>
    );
};

export default EditModal;