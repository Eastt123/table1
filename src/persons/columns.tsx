import {  Person } from "@/store/features/personsSlice";
import { ColumnDef, RowData } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
declare module '@tanstack/table-core' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface TableMeta<TData extends RowData> {
        deletePerson: (person:Person)=> void;
        editPerson:(persn:Person) => void;
    }
  }


export const columns:ColumnDef<Person>[] = [
    
    {
        header:"Name",
        cell({row}) {
            return(
              <div>
                <Link to={`${import.meta.env.BASE_URL}${row.original.id}`}>
                {row.original.name}
                </Link>    
              </div>
            )
        },
    },
   
    {
        header:"Email",
        accessorKey:"email"
    },
    {
        header:"City",
        accessorKey:"address.city"
    },
    {
        id:"Actions",
        header:"Actions",
        cell:({table,row}) => {
            return (
                <>
                <Button onClick={()=>{
                    
                    table.options.meta?.deletePerson(row.original);
                }} >

            
                    Delete
                </Button>
                <Button onClick={()=>{
                    table.options.meta?.editPerson(row.original)
                }} >
                    Edit
                </Button>
                </>
                 )
         },
    }
    
    

]

