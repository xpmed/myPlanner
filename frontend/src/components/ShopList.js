import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import './ShopList.css';

const ShopList = () => {
  const [items, setItems] = useState({
    toBuy: [
      { id: 'item-1', content: 'Mleko' },
      { id: 'item-2', content: 'Chleb' },
      { id: 'item-3', content: 'Masło' },
    ],
    bought: [],
  });

  const [newItem, setNewItem] = useState('');

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const sourceColumn = items[source.droppableId];
    const destColumn = items[destination.droppableId];
    const [removed] = sourceColumn.splice(source.index, 1);
    destColumn.splice(destination.index, 0, removed);

    setItems({
      ...items,
      [source.droppableId]: sourceColumn,
      [destination.droppableId]: destColumn,
    });
  };

  const addNewItem = (e) => {
    e.preventDefault();
    if (newItem.trim() !== '') {
      const newItemObject = { id: `item-${Date.now()}`, content: newItem.trim() };
      setItems({
        ...items,
        toBuy: [...items.toBuy, newItemObject],
      });
      setNewItem('');
    }
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="container">
          <Droppable droppableId="toBuy">
            {(provided) => (
              <div className="column" ref={provided.innerRef} {...provided.droppableProps}>
                <h2>Do kupienia</h2>
                {items.toBuy.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        className="item"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {item.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <Droppable droppableId="bought">
            {(provided) => (
              <div className="column" ref={provided.innerRef} {...provided.droppableProps}>
                <h2>Kupione</h2>
                {items.bought.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        className="item"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {item.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>

      <div className="add-item-form">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Dodaj nowy produkt"
        />
        <button onClick={addNewItem}>Dodaj do listy</button>
      </div>
    </div>
  );
};

export default ShopList;
