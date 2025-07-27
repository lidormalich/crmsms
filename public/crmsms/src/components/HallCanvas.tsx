import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";

interface TableType {
  id: string;
  name: string;
  type: string;
  position: { x: number; y: number };
  capacity: number;
}

interface HallCanvasProps {
  tables: TableType[];
  guestsByTable: Record<string, any[]>;
  onAddTable?: () => void;
  onDeleteTable?: (id: string) => void;
  onTableDrag?: (id: string, data: { x: number; y: number }) => void;
}

const HallCanvas: React.FC<HallCanvasProps> = ({
  tables,
  guestsByTable,
  onAddTable,
  onDeleteTable,
  onTableDrag,
}) => {
  const isEmpty = !tables || tables.length === 0;
  return (
    <div
      style={{
        background: "#f5f5f5",
        borderRadius: 24,
        minHeight: 500,
        margin: 16,
        boxShadow: "0 2px 12px #0001",
        position: "relative",
        overflow: "auto",
      }}>
      {isEmpty ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 300,
            color: "#bbb",
          }}>
          <i
            className='fa fa-table'
            style={{ fontSize: 48, marginBottom: 12 }}
          />
          <div>אין שולחנות ליצירה והושבה</div>
          {onAddTable && (
            <button
              style={{
                marginTop: 16,
                background: "#4caf50",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "8px 24px",
                fontWeight: 600,
                cursor: "pointer",
              }}
              onClick={onAddTable}>
              הוסף שולחן ראשון
            </button>
          )}
        </div>
      ) : (
        <div style={{ position: "relative", minHeight: 500 }}>
          {/* Floating add table button */}
          {onAddTable && (
            <button
              style={{
                position: "absolute",
                top: 16,
                left: 16,
                zIndex: 10,
                background: "#4caf50",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: 48,
                height: 48,
                fontSize: 28,
                boxShadow: "0 2px 8px #0002",
                cursor: "pointer",
              }}
              onClick={onAddTable}
              title='הוסף שולחן'>
              <i className='fa fa-plus' />
            </button>
          )}
          {/* Render tables as Droppable */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 32,
              justifyContent: "center",
              alignItems: "flex-start",
              padding: 32,
            }}>
            {tables.map((table, idx) => (
              <Droppable
                droppableId={`table-${table.id}`}
                key={table.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      minWidth: 140,
                      minHeight: 140,
                      borderRadius: table.type === "Round" ? "50%" : 12,
                      background: snapshot.isDraggingOver ? "#e3f2fd" : "#fff",
                      border: "2px solid #90caf9",
                      boxShadow: "0 2px 8px #0001",
                      position: "relative",
                      padding: 16,
                      margin: 8,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}>
                    <div style={{ fontWeight: 700, marginBottom: 4 }}>
                      {table.name}
                    </div>
                    <div
                      style={{ fontSize: 13, color: "#888", marginBottom: 8 }}>
                      {table.type} | {guestsByTable[table.id]?.length || 0}/
                      {table.capacity}
                    </div>
                    {/* Delete table button */}
                    {onDeleteTable && (
                      <button
                        style={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                          background: "#f44336",
                          color: "#fff",
                          border: "none",
                          borderRadius: 8,
                          padding: "2px 8px",
                          fontSize: 14,
                          cursor: "pointer",
                        }}
                        onClick={() => onDeleteTable(table.id)}
                        title='מחק שולחן'>
                        <i className='fa fa-trash' />
                      </button>
                    )}
                    {/* Guests at table (Draggable) */}
                    <div style={{ width: "100%", marginTop: 8 }}>
                      {guestsByTable[table.id] &&
                      guestsByTable[table.id].length > 0 ? (
                        guestsByTable[table.id].map(
                          (guest: any, gIdx: number) => (
                            <Draggable
                              draggableId={guest.phoneNumber}
                              index={gIdx}
                              key={guest.phoneNumber}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={{
                                    background: "#e3f2fd",
                                    borderRadius: 8,
                                    marginBottom: 6,
                                    padding: "4px 8px",
                                    fontSize: 14,
                                    color: "#1976d2",
                                    boxShadow: snapshot.isDragging
                                      ? "0 2px 8px #2196f3"
                                      : undefined,
                                    ...provided.draggableProps.style,
                                  }}>
                                  {guest.firstName} {guest.lastName}
                                </div>
                              )}
                            </Draggable>
                          )
                        )
                      ) : (
                        <div
                          style={{
                            color: "#bbb",
                            fontSize: 13,
                            textAlign: "center",
                          }}>
                          אין אורחים בשולחן
                        </div>
                      )}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HallCanvas;
