import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { BottomNav } from "@/components/dashboard/BottomNav";
import { useDeviceContext } from "@/context/DeviceContext";

const Rooms = () => {
  const navigate = useNavigate();
  const { rooms } = useDeviceContext();

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      <div className="px-5 pt-10 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Rooms</h1>
            <p className="text-muted-foreground text-sm mt-0.5">Select a section</p>
          </div>
          <button className="px-4 py-2 bg-card rounded-full text-foreground font-medium text-sm card-shadow">
            Add room
          </button>
        </div>
      </div>

      <div className="flex-1 px-5 space-y-4 overflow-y-auto">
        {rooms.map((room) => (
          <button
            key={room.id}
            onClick={() => navigate(`/room/${room.id}`)}
            className="w-full bg-card rounded-2xl p-3 card-shadow hover:card-shadow-lg transition-all text-left group flex items-center gap-4"
          >
            <div className="w-32 h-24 rounded-xl overflow-hidden flex-shrink-0">
              {room.image ? (
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground text-xs">No image</span>
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-foreground">{room.name}</h3>
              <button 
                className="mt-2 px-4 py-1.5 bg-secondary rounded-full text-sm font-medium text-secondary-foreground"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/room/${room.id}`);
                }}
              >
                Select
              </button>
            </div>
          </button>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default Rooms;