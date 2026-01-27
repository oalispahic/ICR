import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";
import { BottomNav } from "@/components/dashboard/BottomNav";
import { useDeviceContext } from "@/context/DeviceContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Rooms = () => {
  const navigate = useNavigate();
  const { rooms, addRoom } = useDeviceContext();
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const [newRoomImage, setNewRoomImage] = useState("");

  const handleCreateRoom = () => {
    if (!newRoomName.trim()) {
      toast.error("Please enter a room name");
      return;
    }
    
    addRoom({
      name: newRoomName,
      icon: 'Home',
      deviceCount: 0,
      activeDevices: 0,
      temperature: 22,
      humidity: 45,
      image: newRoomImage || undefined,
    });
    
    toast.success(`${newRoomName} created successfully!`);
    setNewRoomName("");
    setNewRoomImage("");
    setShowAddRoom(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      <div className="px-5 pt-10 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Rooms</h1>
            <p className="text-muted-foreground text-sm mt-0.5">Select a section</p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowAddRoom(true)}
              className="w-8 h-8 rounded-full bg-card flex items-center justify-center card-shadow"
            >
              <Plus className="w-4 h-4 text-foreground" />
            </button>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium card-shadow transition-colors ${
                isEditing ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground'
              }`}
            >
              {isEditing ? 'Done' : 'Edit'}
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 px-5 space-y-4 overflow-y-auto">
        {rooms.map((room) => (
          <button
            key={room.id}
            onClick={() => !isEditing && navigate(`/room/${room.id}`)}
            className="w-full bg-card rounded-2xl p-3 card-shadow hover:card-shadow-lg transition-all text-left group flex items-center gap-4 relative"
          >
            {isEditing && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toast.info("Room deletion coming soon");
                }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-destructive rounded-full flex items-center justify-center text-destructive-foreground z-10"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            )}
            
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
              <p className="text-muted-foreground text-sm">{room.deviceCount} devices</p>
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

      {/* Add Room Dialog */}
      <Dialog open={showAddRoom} onOpenChange={setShowAddRoom}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle>Create New Room</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="roomName">Room Name</Label>
              <Input
                id="roomName"
                placeholder="e.g., Guest Bedroom"
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
                className="bg-muted border-border"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="roomImage">Image URL (optional)</Label>
              <Input
                id="roomImage"
                placeholder="https://example.com/room.jpg"
                value={newRoomImage}
                onChange={(e) => setNewRoomImage(e.target.value)}
                className="bg-muted border-border"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowAddRoom(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={handleCreateRoom}
                disabled={!newRoomName.trim()}
              >
                Create Room
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
};

export default Rooms;