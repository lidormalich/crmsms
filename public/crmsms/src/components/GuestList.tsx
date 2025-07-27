import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";

interface GuestType {
  id: string;
  firstName: string;
  lastName: string;
  status: string;
}

interface GuestListProps {
  guests: GuestType[];
  onAddGuest?: () => void;
}

const GuestList: React.FC<GuestListProps> = ({ guests, onAddGuest }) => {
  const isEmpty = !guests || guests.length === 0;
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 2px 8px #0002",
        minWidth: 260,
        margin: 16,
        padding: 16,
        maxHeight: 500,
        overflowY: "auto",
      }}>
      <h4 style={{ textAlign: "center", color: "#2196f3" }}>רשימת אורחים</h4>
      <Droppable droppableId='guests-list'>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ minHeight: 120 }}>
            {isEmpty ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: 120,
                  color: "#bbb",
                }}>
                <i
                  className='fa fa-users'
                  style={{ fontSize: 40, marginBottom: 10 }}
                />
                <div>אין אורחים להצגה</div>
                {onAddGuest && (
                  <button
                    style={{
                      marginTop: 16,
                      background: "#2196f3",
                      color: "#fff",
                      border: "none",
                      borderRadius: 8,
                      padding: "8px 24px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                    onClick={onAddGuest}>
                    הוסף אורח ראשון
                  </button>
                )}
              </div>
            ) : (
              guests.map((guest, idx) => (
                <Draggable
                  draggableId={guest.id}
                  index={idx}
                  key={guest.id}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        padding: 8,
                        borderBottom: "1px solid #eee",
                        background: snapshot.isDragging ? "#e3f2fd" : undefined,
                        borderRadius: 8,
                        marginBottom: 4,
                        ...provided.draggableProps.style,
                      }}>
                      {guest.firstName} {guest.lastName}{" "}
                      <span style={{ color: "#bbb" }}>{guest.status}</span>
                    </div>
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default GuestList;
