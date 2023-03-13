import { useEffect, useState } from 'react';
import {DragDropContext , Droppable , Draggable} from 'react-beautiful-dnd';
import './App.css';
import React from 'react';

const data = [
  {
    id:1,
    name:'kashyap',
  },
  {
    id:2,
    name:'sager',
  },
  {
    id:3,
    name:'juzar',
  },
  {
    id:4,
    name:'aziz',
  },
  {
    id:5,
    name:'ravi',
  },
  {
    id:6,
    name:'sujit',
  }
];

const reorder  = (list , startIndex , endIndex) => {
    const result = Array.from(list);
    const[remove] = result.splice(startIndex,1);
    result.splice(endIndex,0,remove);
    return result;
}

const getliststyle = (isDraggingOver) =>({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding:8,
  width:250
});


const getitemstyle = (isDragging,draggablestyle) => ({
 
  // some basic styles to make the items look
    userSelect : 'none',
    padding : 16,
    margin : '0 0 8px 0',

     // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggablestyle
})

function App() 
{
    const [items,setitems] = useState([]);

    useEffect(() => {
         setitems(data);
    },[]);

    const onDragEnd = (result) => {
      if(!result.destination)
      {
        return;
      }

      const recorditems = reorder(
        items ,
        result.source.index,
        result.destination.index
      );

      console.log(reorder);
      setitems(recorditems);
    }

     return(
      <div className='main'>
        <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId='droppable'> 
                    {(provided,snapshot) => (
                          <div
        
                               {...provided.droppableProps}
                                ref={provided.innerRef} 
                                style={getliststyle(snapshot.isDraggingOver)}
                           > 
                           <div>

                           {
                                items.map((item,index) => (
                                    
                                    <Draggable key={item.id} draggableId={item.id}index={index}>
                                      <div>
                                          {(provided,snapshot) => (
                                              <div className='card' 
                                                  ref = {provided.innerRef}
                                                  {...provided.draggableProps}
                                                  {...provided.dragHandleProps}
                                                  style={getitemstyle(snapshot.isDragging,provided.draggableProps.style)}
                                                >
                                                    {item.name}
                                                </div>
                                            )};
                                        </div>
                                    </Draggable> 
                                ))
                           }
                           </div>
                          </div>
                    )}
              </Droppable>  
        </DragDropContext>
      </div>
     )
}

export default App;
