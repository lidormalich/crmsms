import React, { FunctionComponent, useState, useMemo, useEffect } from "react";
import { Table } from "../interfaces/Table";
import People from "../interfaces/People";
import { Button, Form, Modal, Table as BootstrapTable } from "react-bootstrap";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import type { DroppableProvided, DraggableProvided } from "@hello-pangea/dnd";
import {
  getTables,
  createTable,
  updateTable,
  deleteTable,
} from "../Services/TableServices";
import { useParams } from "react-router-dom";
import {
  getPeopleInEventByID,
  updatePeopleInEvent,
} from "../Services/eventServices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getLayout, saveLayout } from "../Services/LayoutServices";
import DraggableTable from "react-draggable";
import StatsBar from "./StatsBar";
import HallCanvas from "./HallCanvas";
import GuestList from "./GuestList";

const DEFAULT_TABLE_TYPES = [
  "Round",
  "Square",
  "VIP",
  "Kids",
  "Default",
] as const;
type TableType = (typeof DEFAULT_TABLE_TYPES)[number];

// דמו ראשוני של אורחים
const initialGuests: People[] = [
  {
    phoneNumber: "0501234567",
    firstName: "David",
    lastName: "Levi",
    NumberOfGuests: 1,
    NumberOfGuestsAccept: 0,
    eventGroupName: "Family",
  },
  {
    phoneNumber: "0509876543",
    firstName: "Sara",
    lastName: "Cohen",
    NumberOfGuests: 2,
    NumberOfGuestsAccept: 0,
    eventGroupName: "Friends",
  },
  {
    phoneNumber: "0505555555",
    firstName: "Moshe",
    lastName: "Bar",
    NumberOfGuests: 1,
    NumberOfGuestsAccept: 0,
    eventGroupName: "Work",
  },
];

const initialTables: Table[] = [
  {
    id: "1",
    name: "Table 1",
    type: "Round",
    capacity: 10,
    eventId: "demo",
    guests: [],
    position: { x: 100, y: 100 },
  },
  {
    id: "2",
    name: "VIP Table",
    type: "VIP",
    capacity: 6,
    eventId: "demo",
    guests: [],
    position: { x: 300, y: 100 },
  },
];

// אלמנטים מיוחדים
interface HallElement {
  id: string;
  type: "stage" | "partitionWall";
  label: string;
  position: { x: number; y: number };
}

const initialElements: HallElement[] = [
  { id: "stage", type: "stage", label: "Stage", position: { x: 0, y: 0 } },
  {
    id: "partition1",
    type: "partitionWall",
    label: "Partition Wall",
    position: { x: 2, y: 2 },
  },
];

// Add position to Table type
interface TableWithPosition extends Table {
  position: { x: number; y: number };
}

/**
 * TableManager – Drag & Drop אולם אירועים עם שולחנות, אורחים, במה, קיר הפרדה
 */
const TableManager: FunctionComponent = (): JSX.Element => {
  const { eventId } = useParams();
  const [tables, setTables] = useState<Table[]>(initialTables);
  const [guests, setGuests] = useState<People[]>([]);
  const [elements, setElements] = useState<HallElement[]>(initialElements);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTable, setNewTable] = useState<{
    name: string;
    type: TableType;
    capacity: number;
  }>({ name: "", type: "Round", capacity: 10 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [guestsLoading, setGuestsLoading] = useState(false);
  const [guestsError, setGuestsError] = useState<string | null>(null);
  const [layoutLoaded, setLayoutLoaded] = useState(false);

  // אורחים שטרם שובצו
  const unassignedGuests = useMemo(
    () => guests.filter((g) => !g.tableId),
    [guests]
  );
  // אורחים לכל שולחן
  const guestsByTable = useMemo(() => {
    const map: Record<string, People[]> = {};
    tables.forEach((table) => {
      map[table.id] = guests.filter((g) => g.tableId === table.id);
    });
    return map;
  }, [guests, tables]);

  useEffect(() => {
    if (!eventId) return;
    setLoading(true);
    getTables(eventId as string)
      .then((res) =>
        setTables(
          res.data.map((t: any, i: number) => ({
            ...t,
            position: t.position || { x: 100 + i * 180, y: 100 },
          }))
        )
      )
      .catch(() => setError("Failed to load tables"))
      .finally(() => setLoading(false));
  }, [eventId]);

  useEffect(() => {
    if (!eventId) return;
    setGuestsLoading(true);
    getPeopleInEventByID(eventId as string)
      .then((res) => setGuests(res.data))
      .catch(() => setGuestsError("Failed to load guests"))
      .finally(() => setGuestsLoading(false));
  }, [eventId]);

  useEffect(() => {
    if (!eventId) return;
    setLoading(true);
    getLayout(eventId as string)
      .then((res) => {
        if (res.data) {
          setTables(
            (res.data.tables || []).map((t: any, i: number) => ({
              ...t,
              position: t.position || { x: 100 + i * 180, y: 100 },
            }))
          );
          setElements(res.data.elements || initialElements);
        }
        setLayoutLoaded(true);
      })
      .catch(() => setError("Failed to load layout"))
      .finally(() => setLoading(false));
  }, [eventId]);

  // Drag & Drop לוגיקה
  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    // גרירת אורח לשולחן
    if (
      result.source.droppableId === "guests-list" &&
      result.destination.droppableId.startsWith("table-")
    ) {
      const guestIdx = result.source.index;
      const tableId = result.destination.droppableId.replace("table-", "");
      const guest = unassignedGuests[guestIdx];
      const updatedGuest = { ...guest, tableId };
      // עדכן סטייט לוקאלי בלבד
      setGuests((prev) =>
        prev.map((g) =>
          g.phoneNumber === guest.phoneNumber ? updatedGuest : g
        )
      );
      // בצע עדכון לשרת ברקע, בלי רענון מלא
      try {
        setGuestsLoading(true);
        await updatePeopleInEvent(eventId as string, updatedGuest);
        toast.success("Guest updated!");
      } catch {
        setGuestsError("Failed to update guest");
        toast.error("Failed to update guest");
      } finally {
        setGuestsLoading(false);
      }
      // אל תרענן את כל הסטייט כאן!
    }
    // גרירת אורח בין שולחנות
    if (
      result.source.droppableId.startsWith("table-") &&
      result.destination.droppableId.startsWith("table-")
    ) {
      const fromTableId = result.source.droppableId.replace("table-", "");
      const toTableId = result.destination.droppableId.replace("table-", "");
      const guest = guestsByTable[fromTableId][result.source.index];
      const updatedGuest = { ...guest, tableId: toTableId };
      setGuests((prev) =>
        prev.map((g) =>
          g.phoneNumber === guest.phoneNumber ? updatedGuest : g
        )
      );
      try {
        setGuestsLoading(true);
        await updatePeopleInEvent(eventId as string, updatedGuest);
        toast.success("Guest updated!");
      } catch {
        setGuestsError("Failed to update guest");
        toast.error("Failed to update guest");
      } finally {
        setGuestsLoading(false);
      }
    }
    // אין רענון מלא של כל הטבלאות/אורחים כאן!
  };

  // הוספת שולחן
  const handleAddTable = async () => {
    try {
      setLoading(true);
      const newPosition = { x: 100 + tables.length * 180, y: 100 };
      const res = await createTable({
        ...newTable,
        eventId: eventId as string,
        guests: [],
        position: newPosition,
      });
      setTables((prev) => [...prev, { ...res.data, position: newPosition }]);
      setShowAddModal(false);
      setNewTable({ name: "", type: "Round", capacity: 10 });
      toast.success("Table added!");
    } catch {
      setError("Failed to add table");
      toast.error("Failed to add table");
    } finally {
      setLoading(false);
    }
  };

  // Update handleDrag for tables
  const handleTableDrag = (id: string, data: { x: number; y: number }) => {
    setTables((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, position: { x: data.x, y: data.y } } : t
      )
    );
  };

  // Update saveLayout to include positions
  const handleSaveLayout = async () => {
    if (!eventId) return;
    setLoading(true);
    try {
      await saveLayout(eventId as string, {
        tables,
        elements,
      });
      toast.success("Layout saved!");
    } catch {
      toast.error("Failed to save layout");
    } finally {
      setLoading(false);
    }
  };

  // ייצוג גרפי של במה
  const renderStage = (): JSX.Element => (
    <div
      style={{
        background: "#b3e5fc",
        borderRadius: 8,
        padding: 10,
        textAlign: "center",
        marginBottom: 16,
      }}>
      <strong>Stage</strong>
    </div>
  );

  // ייצוג גרפי של קיר הפרדה
  const renderPartitionWall = (): JSX.Element => (
    <div
      style={{
        background: "#ffe082",
        borderRadius: 4,
        padding: 6,
        textAlign: "center",
        margin: 8,
        minWidth: 80,
      }}>
      <strong>Partition Wall</strong>
    </div>
  );

  return (
    <div className='material-table-manager'>
      <StatsBar
        confirmed={23}
        maybe={3}
        notComing={8}
        noResponse={13}
        // TODO: Replace with real summary data
      />
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className='material-main-content'>
          <HallCanvas
            tables={tables.map((t) => ({
              ...t,
              position: t.position || { x: 100, y: 100 },
            }))}
            guestsByTable={guestsByTable}
            onAddTable={() => setShowAddModal(true)}
            onDeleteTable={async (id: string) => {
              setLoading(true);
              setError(null);
              try {
                await deleteTable(id);
                // Refresh tables from server after delete
                const res = await getTables(eventId as string);
                setTables(
                  res.data.map((t: any, i: number) => ({
                    ...t,
                    position: t.position || { x: 100 + i * 180, y: 100 },
                  }))
                );
                toast.success("Table deleted!");
              } catch {
                setError("Failed to delete table");
                toast.error("Failed to delete table");
              } finally {
                setLoading(false);
              }
            }}
          />
          <GuestList
            guests={unassignedGuests.map((g) => ({
              id: g.phoneNumber,
              firstName: g.firstName,
              lastName: g.lastName,
              status: (g as any).status || "",
            }))}
          />
        </div>
      </DragDropContext>
      {/* Add Table Modal */}
      <Modal
        show={showAddModal}
        onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>הוסף שולחן</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Label>שם שולחן</Form.Label>
              <Form.Control
                type='text'
                value={newTable.name}
                onChange={(e) =>
                  setNewTable({ ...newTable, name: e.target.value })
                }
                placeholder='שם שולחן'
                required
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>סוג שולחן</Form.Label>
              <Form.Select
                value={newTable.type}
                onChange={(e) =>
                  setNewTable({
                    ...newTable,
                    type: e.target.value as TableType,
                  })
                }>
                {DEFAULT_TABLE_TYPES.map((type) => (
                  <option
                    key={type}
                    value={type}>
                    {type}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>קיבולת</Form.Label>
              <Form.Control
                type='number'
                min={1}
                value={newTable.capacity}
                onChange={(e) =>
                  setNewTable({ ...newTable, capacity: Number(e.target.value) })
                }
                placeholder='קיבולת'
                required
              />
            </Form.Group>
            {error && <div className='alert alert-danger'>{error}</div>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={() => setShowAddModal(false)}>
            ביטול
          </Button>
          <Button
            variant='primary'
            onClick={handleAddTable}
            disabled={!newTable.name || newTable.capacity < 1 || loading}>
            {loading ? <i className='fa fa-spinner fa-spin'></i> : "הוסף שולחן"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TableManager;
