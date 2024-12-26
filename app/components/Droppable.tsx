import React from 'react'
import Draggable from './Draggable'
import { categories } from '../data/categories'
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable'

const Droppable = ({categories}:{
    categories:{
        name:string;
        id:number;
        zone:string
    }[]
}) => {
  return (
    <div className='grid grid-cols-2 mt-14 gap-5'>
                                <SortableContext items={categories.filter((item) => item.zone === "zone1")} strategy={horizontalListSortingStrategy}>
                                <div className='w-full h-32 border rounded-md' id='zone1'>
                                    {categories.filter((item)=>item.zone==="zone1").map((item:{name:string,id:number})=>(
                                        <Draggable name={item.name} id={item.id} key={item.id}/>
                                    ))}
                                </div>
                                </SortableContext>
    
                                    
                                <SortableContext items={categories.filter((item) => item.zone === "zone2")} strategy={horizontalListSortingStrategy}>
                                <div className='w-full h-full border rounded-md gap-1 flex flex-wrap items-start p-4'>
                                    
                                {categories.filter((item)=>item.zone==="zone2").map((item:{name:string,id:number})=>(
                                        <Draggable name={item.name} id={item.id} key={item.id}/>
                                    ))}
                                </div>
                                </SortableContext>
        </div>
  )
}

export default Droppable