import { useState } from "react";
import { useFetch } from "../hooks/useFetch";

//styles
import "./TripList.css";

export default function TripList() {
  const [url, setUrl] = useState("http://localhost:3000/trips");
  const { data: trips, loading, error } = useFetch(url);
  

  return (
    <div className="trip-list">
      <h2>Trips:</h2>
      {loading &&  <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {trips &&
          trips.map((trip) => (
            <li key={trip.id}>
              <h3>{trip.title}</h3>
              <p>{trip.price}</p>
            </li>
          ))}
      </ul>
      <div className="filters">
        <button onClick={() => setUrl("http://localhost:3000/trips?loc=Eu")}>
          Eu Trips
        </button>
        <button onClick={() => setUrl("http://localhost:3000/trips")}>
          All Trips
        </button>
      </div>
    </div>
  );
}
