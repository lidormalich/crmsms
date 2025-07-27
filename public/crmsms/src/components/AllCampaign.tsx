import {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { Link } from "react-router-dom";
import { isLoginGlobal } from "../App";
import EventInterface from "../interfaces/EventInterface";
import { getAllEvent } from "../Services/eventServices";
import Loading from "./Extra/Loading";
import NotHaveAccess from "./Extra/NotHaveAccess";
import DeleteCMP from "./DeleteCMP";
import { Button, Form, InputGroup } from "react-bootstrap";

interface AllCampaignProps {}

/**
 * Campaigns table with search, loading, error, and UX improvements
 */
const AllCampaign: FunctionComponent<AllCampaignProps> = () => {
  const [events, setEvents] = useState<EventInterface[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [refreshFlag, setRefreshFlag] = useState<boolean>(false);
  const [selectedEventId, setSelectedEventId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  let eventCounter = 0;
  const isLoggedIn = useContext<boolean>(isLoginGlobal);

  const fetchEvents = useCallback(() => {
    setIsLoading(true);
    setError(null);
    getAllEvent(sessionStorage.getItem("Authorization") as string)
      .then((res) => setEvents(res.data))
      .catch(() => setError("Failed to load events"))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents, refreshFlag]);

  const refresh = () => setRefreshFlag((prev) => !prev);

  // חיפוש קמפיינים ב-state
  const filteredEvents = useMemo(() => {
    if (!search.trim()) return events;
    return events.filter((e) =>
      e.campaignName?.toLowerCase().includes(search.toLowerCase())
    );
  }, [events, search]);

  if (!isLoggedIn) return <NotHaveAccess />;

  return (
    <div className='container py-3'>
      <div className='d-flex flex-column flex-md-row align-items-center justify-content-between mb-3 gap-2'>
        <h3 className='mb-0'>Campaigns</h3>
        <InputGroup style={{ maxWidth: 300 }}>
          <Form.Control
            type='text'
            placeholder='Search by campaign name...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label='Search campaigns'
          />
          <Button
            variant='outline-secondary'
            onClick={refresh}
            title='Refresh list'>
            <i className='fa fa-refresh'></i>
          </Button>
        </InputGroup>
      </div>
      {isLoading ? (
        <Loading stringToShow='Loading events...' />
      ) : error ? (
        <div className='alert alert-danger'>{error}</div>
      ) : filteredEvents.length ? (
        <div className='table-responsive'>
          <table className='table table-hover align-middle'>
            <thead className='table-light'>
              <tr>
                <th>#</th>
                <th>Campaign Name</th>
                <th>Manage</th>
                <th>Delete Event</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((eventItem: EventInterface) => (
                <tr key={eventCounter}>
                  <td>{eventCounter++}</td>
                  <td>{eventItem.campaignName}</td>
                  <td>
                    <Link
                      to={`/campaign/${eventItem._id}`}
                      title='Manage'>
                      <img
                        src='https://cdn-icons-png.flaticon.com/512/32/32355.png'
                        height={30}
                        alt='Manage'
                      />
                    </Link>
                  </td>
                  <td>
                    <Button
                      variant='outline-danger'
                      size='sm'
                      onClick={() => {
                        setSelectedEventId(eventItem._id as string);
                        setIsDeleteModalOpen(true);
                      }}
                      title='Delete event'>
                      <img
                        src='https://img.icons8.com/ios/256/del-key.png'
                        height={24}
                        alt='Delete'
                      />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className='text-center py-5'>
          <i className='fa fa-folder-open fa-3x text-muted mb-3'></i>
          <div className='lead'>No campaigns found.</div>
        </div>
      )}
      <DeleteCMP
        show={isDeleteModalOpen}
        onHide={() => setIsDeleteModalOpen(false)}
        eventId={selectedEventId}
        refresh={refresh}
      />
    </div>
  );
};

export default AllCampaign;
