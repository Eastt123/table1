import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
  } from "@tanstack/react-table"
   
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import {  useState } from "react";
import { Person  } from "@/store/features/personsSlice";
import DeleteModal from "@/components/DeleteModal/DeleteModal";
import EditModal from "@/components/EditModal/EditModal";
import { Button } from "@/components/ui/button";


  interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
  }

  

      
      function PerosnsDataTable<Tdata, Tvalue>({columns, data}:DataTableProps<Tdata, Tvalue>){
        const [deleteModal, setDeleteModal] = useState(false);
        const [editModal, setEditModal] = useState(false);
        const [person, setPerson] = useState<Person>();
        
        
        const  table = useReactTable({
      data,
      columns,
      getCoreRowModel:getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel:getPaginationRowModel(),

      meta:{
        deletePerson: (person:Person) => {
          setPerson(person);
          setDeleteModal(true)
        },
        editPerson:(person:Person)=>{
          setEditModal(true);
          setPerson(person);
        }
      }

    });


   
    

    return(
      <div className='py-10 rounded-md border' >
        {deleteModal && <DeleteModal setDeleteModal={setDeleteModal} person={person} />}
        {editModal && <EditModal setEditModal={setEditModal}  person={person}/>}
      <Table>

<TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead className="text-center" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
             
            </TableRow>
          ))}
        </TableHeader>
        <TableBody >
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map( row => {
                            return(
                                <TableRow  key={row.id} >
                                        {row.getVisibleCells().map(cell => {
                                            return(
                                                <TableCell className="text-center" key={cell.id}>
                                                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            )
                                        })}
                                        
                                         

                                </TableRow>
                            )
                        })
                    ):(
                        <TableRow>
                            <TableCell>No Result</TableCell>
                        </TableRow>

                    )}
                </TableBody>

      </Table>
          <div className="flex item-center justify-start space-x-2 py-4">
            <Button 
            onClick={()=>{

              table.previousPage();

            }} 
            disabled={!table.getCanPreviousPage()}
            >Previous Page</Button>
            <Button onClick={()=>{

              table.nextPage();

            }} 
            disabled={!table.getCanNextPage()}
            >Next Page</Button>
            </div>            
      </div>
    ) 
  }

export default PerosnsDataTable;