import { deletePerson, Person } from "@/store/features/personsSlice";
import { AppDispatch } from "@/store/store";
import { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";

interface DeleteProps{
    person: Person | undefined,
    setDeleteModal:Dispatch<SetStateAction<boolean>>
}

const DeleteModal = ({person,setDeleteModal}:DeleteProps) => {
    const dispatch = useDispatch<AppDispatch>();
    
    return (
        <div 

        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>)=>{
            if((e.target as Element).classList.contains("delete")){
                setDeleteModal(false);
            }

        }}
        className="delete absolute z-10 left-0 top-0 flex w-full h-full items-center justify-center bg-neutral-300 bg-opacity-50">
            <div  className="rounded p-8 bg-white w-96 flex justify-center">
            <button className="bg-blue-600 w-20 text-white h-10 rounded mr-2" onClick={()=>{setDeleteModal(false)}}>Cancel</button>
                <button  
                onClick={()=>{
                    dispatch(deletePerson(person!.id));
                    setDeleteModal(false);
                }}

                className="bg-red-600 w-20 text-white h-10 rounded" >Delete</button>
            </div>

        </div>
    );
};

export default DeleteModal;