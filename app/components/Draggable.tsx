import React from 'react'
import { useSortable } from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';


const Draggable = ({name,id}:{
     name:string;
    id:number
}) => {

    const {attributes,listeners,setNodeRef,transform,transition} = useSortable({id})

    const style = {
        transition,
        transform: CSS.Translate.toString(transform),
    }

    return (
        <div className='border rounded-full w-fit py-1 px-2 h-fit bg-blue-950 text-white' ref={setNodeRef} {...attributes} {...listeners} style={style}>
            {name}
        </div>
    )
}

export default Draggable