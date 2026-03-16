import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = ({ latitude, longitude }) => {
  if (!latitude || !longitude) return null

  const position = [latitude, longitude]

  return (
    <MapContainer center={position} zoom={13} className="h-67.5 w-155 rounded-md">
      <TileLayer
        attribution='© OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={position}>
        <Popup>
          Hello from Tbilisi
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map