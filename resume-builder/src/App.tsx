import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { useState } from 'react';

// TODO: Add type for individual categories

type Category = "title" | "experience" | "projects" | "skills";
interface Section { id: number; title: string }

function App() {
  const [sections, setSections] = useState<Section[]>([{ title: "experience", id: 1 }, { title: "projects", id: 2 }, { title: "skills", id: 3 }])

  const currentCategory = useState<Category>("experience");

  return (
    <DragDropContext onDragEnd={(result) => {
      if (!result.destination) return

      const copySections = [...sections];
      const originalIndex = result.source.index;
      const targetIndex = result.destination.index;

      if (originalIndex != targetIndex) {
        const originalIndexValue = copySections[originalIndex];
        copySections[originalIndex] = copySections[targetIndex];
        copySections[targetIndex] = originalIndexValue;
      }
      setSections(prev => copySections);
    }}>
      <div className='flex items-center justify-center bg-slate-900 w-full h-full'>
        <div className="flex bg-slate-300 justify-center w-[40rem] h-[50rem]">
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className='w-full'
              //style={getListStyle(snapshot.isDraggingOver)}
              >
                {sections.map((elem, i) => {
                  return (
                    <Draggable draggableId={`${elem.id}`} key={`${elem.id}`} index={i}>
                      {(provided, snapshot) => (
                        <div
                          {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
                          <div className='w-full h-40 bg-red-300' onClick={() => console.log(elem.title, "clicked")}>{elem.title}</div>
                        </div>
                      )}
                    </Draggable>
                  )
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        <div className="flex bg-slate-300 justify-center w-[20rem] h-[50rem]">
          {currentCategory == "title" && <div>Title</div>}
          {currentCategory == "experience" && <div>Experience</div>}
          {currentCategory == "projects" && <div>Projects</div>}
          {currentCategory == "skills" && <div>Skills</div>}
        </div>
      </div>
    </DragDropContext>
  )
}

export default App
