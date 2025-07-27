import {
  FunctionComponent,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { Link, useParams } from "react-router-dom";
import {
  getEventInfoByID,
  getPeopleInEventByID,
} from "../Services/eventServices";
import { getDataNew } from "../Services/SMSservices";
import DeleteModal from "./DeleteModal";
import UpdateModal from "./UpdateModal";
import "./invTable.css";
import { errorMessage } from "../Services/FeedbackService";
import { BrowserView, isBrowser } from "react-device-detect";
import People from "../interfaces/People";
import { Button, Form, InputGroup } from "react-bootstrap";
import GloablModal from "./GloablModal";

interface InvitationTableProps {
  peopleChanged: boolean;
  setPeopleChanged: (changed: boolean) => void;
  refreshDash: () => void;
}

/**
 * Guests table with search, loading, error, and UX improvements
 */
const InvitationTable: FunctionComponent<InvitationTableProps> = ({
  peopleChanged,
  setPeopleChanged,
  refreshDash,
}) => {
  const [guests, setGuests] = useState<People[]>([]);
  const [eventInfo, setEventInfo] = useState<any>({
    uuid: "",
    campaignName: "",
    ownerName: "",
    phone: "",
    bride: "",
    groom: "",
    coupleImage: "",
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [isGlobalModalOpen, setIsGlobalModalOpen] = useState<boolean>(false);
  const [selectedPhone, setSelectedPhone] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { eventId } = useParams();
  let guestCounter: number = 0;

  // רענון טבלה
  const refresh = useCallback(() => {
    setPeopleChanged(!peopleChanged);
    refreshDash();
  }, [peopleChanged, setPeopleChanged, refreshDash]);

  // טעינת מידע על האירוע
  useEffect(() => {
    setIsLoading(true);
    getEventInfoByID(eventId as string)
      .then((res) => setEventInfo(res.data))
      .catch((e) => {
        setError("Error: Can't get event info");
        errorMessage("Error , Can't get info...");
      })
      .finally(() => setIsLoading(false));
  }, [eventId]);

  // טעינת אורחים
  useEffect(() => {
    setIsLoading(true);
    getPeopleInEventByID(eventId as string)
      .then((res) => setGuests(res.data))
      .catch(() => setError("Failed to load guests"))
      .finally(() => setIsLoading(false));
  }, [peopleChanged, eventId]);

  // חיפוש אורחים ב-state
  const filteredGuests = useMemo(() => {
    if (!search.trim()) return guests;
    return guests.filter(
      (guest) =>
        `${guest.firstName} ${guest.lastName}`
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        guest.eventGroupName?.toLowerCase().includes(search.toLowerCase()) ||
        guest.phoneNumber?.includes(search)
    );
  }, [guests, search]);

  // עיצוב טלפון
  const formatPhoneNumber = (phone: string) => {
    if (phone.startsWith("+972")) return phone.slice(4);
    if (phone.startsWith("05")) return phone.slice(1);
    return phone;
  };

  return (
    <div className='container py-3'>
      <div className='d-flex flex-column flex-md-row align-items-center justify-content-between mb-3 gap-2'>
        <h3 className='mb-0'>Guest List</h3>
        <InputGroup style={{ maxWidth: 350 }}>
          <Form.Control
            type='text'
            placeholder='Search by name, group, or phone...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label='Search guests'
          />
          <Button
            variant='outline-secondary'
            onClick={refresh}
            title='Refresh list'>
            <i className='fa fa-refresh'></i>
          </Button>
        </InputGroup>
      </div>
      <div className='mb-2'>
        <Button
          className='w-25'
          onClick={() => setIsGlobalModalOpen(true)}>
          Add Guest
        </Button>
      </div>
      {isLoading ? (
        <div className='py-5'>
          <i className='fa fa-spinner fa-spin fa-2x'></i>
        </div>
      ) : error ? (
        <div className='alert alert-danger'>{error}</div>
      ) : filteredGuests.length ? (
        <div className='table-responsive'>
          <table className='table table-hover align-middle'>
            <thead className='table-light'>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Group</th>
                <th>Phone</th>
                <th>Guests Confirmed</th>
                <th>SMS</th>
                <th>Edit / Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredGuests.map((guest: People) => (
                <tr key={guestCounter}>
                  {isBrowser && <td>{++guestCounter}</td>}
                  <td>{`${guest.firstName} ${guest.lastName}`}</td>
                  <td>{guest.eventGroupName}</td>
                  <td>{formatPhoneNumber(guest.phoneNumber)}</td>
                  <td>
                    <span
                      style={{
                        color:
                          guest.NumberOfGuestsAccept > 0 ? "green" : "black",
                      }}>
                      {guest.NumberOfGuestsAccept}/{guest.NumberOfGuests}
                    </span>
                  </td>
                  <td>
                    <Button
                      variant='outline-info'
                      size='sm'
                      onClick={() =>
                        getDataNew(
                          guest,
                          eventInfo.groom,
                          eventInfo.bride,
                          eventId as string
                        )
                      }
                      title='Send SMS'>
                      <i className='fa-solid fa-comment-sms'></i>
                    </Button>
                  </td>
                  <td>
                    <Link
                      to={
                        eventId
                          ? `/tablemanager/${eventId}?guest=${guest.phoneNumber}`
                          : "#"
                      }
                      title='סידור שולחן'>
                      <Button
                        variant='outline-primary'
                        size='sm'
                        className='mx-1'
                        disabled={!eventId}>
                        <i className='fa fa-chair'></i>
                      </Button>
                    </Link>
                    <Button
                      variant='outline-success'
                      size='sm'
                      className='mx-1'
                      onClick={() => {
                        setSelectedPhone(guest.phoneNumber);
                        setIsUpdateModalOpen(true);
                      }}
                      title='Edit guest'>
                      <i className='fa-solid fa-pen'></i>
                    </Button>
                    <Button
                      variant='outline-danger'
                      size='sm'
                      onClick={() => {
                        setSelectedPhone(guest.phoneNumber);
                        setIsDeleteModalOpen(true);
                      }}
                      title='Delete guest'>
                      <i className='fa-solid fa-trash-can'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className='text-center py-5'>
          <i className='fa fa-users fa-3x text-muted mb-3'></i>
          <div className='lead'>No guests found.</div>
        </div>
      )}
      <DeleteModal
        show={isDeleteModalOpen}
        onHide={() => setIsDeleteModalOpen(false)}
        phoneNum={selectedPhone}
        eventId={eventId as string}
        refresh={refresh}
      />
      <GloablModal
        show={isGlobalModalOpen}
        onHide={() => setIsGlobalModalOpen(false)}
        refresh={refresh}
        setPeopleChanged={setPeopleChanged}
        peopleChange={peopleChanged}
      />
      <UpdateModal
        show={isUpdateModalOpen}
        onHide={() => setIsUpdateModalOpen(false)}
        eventId={eventId as string}
        phoneNum={selectedPhone}
        refresh={refresh}
      />
    </div>
  );
};

export default InvitationTable;
