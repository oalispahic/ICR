import { Camera, Circle, Play, Pause, Volume2, VolumeX, Plus, Pencil, Trash2, QrCode, X } from "lucide-react";
import { BottomNav } from "@/components/dashboard/BottomNav";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface CameraFeed {
  id: string;
  name: string;
  location: string;
  isOnline: boolean;
  isRecording: boolean;
}

const CameraStatus = () => {
  const [cameras, setCameras] = useState<CameraFeed[]>([
    { id: '1', name: 'Front Door', location: 'Entrance', isOnline: true, isRecording: true },
    { id: '2', name: 'Backyard', location: 'Garden', isOnline: true, isRecording: false },
    { id: '3', name: 'Garage', location: 'Parking', isOnline: false, isRecording: false },
    { id: '4', name: 'Living Room', location: 'Indoor', isOnline: true, isRecording: true },
  ]);

  const [selectedCamera, setSelectedCamera] = useState<string | null>('1');
  const [isMuted, setIsMuted] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddCamera, setShowAddCamera] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [newCameraName, setNewCameraName] = useState('');
  const [newCameraLocation, setNewCameraLocation] = useState('');

  const toggleRecording = (cameraId: string) => {
    setCameras(prev => prev.map(cam => 
      cam.id === cameraId ? { ...cam, isRecording: !cam.isRecording } : cam
    ));
  };

  const removeCamera = (cameraId: string) => {
    setCameras(prev => prev.filter(cam => cam.id !== cameraId));
    if (selectedCamera === cameraId) {
      setSelectedCamera(cameras.find(c => c.id !== cameraId)?.id || null);
    }
  };

  const handleAddCamera = () => {
    if (!newCameraName.trim()) return;
    
    const newCamera: CameraFeed = {
      id: `cam_${Date.now()}`,
      name: newCameraName,
      location: newCameraLocation || 'Unknown',
      isOnline: true,
      isRecording: false,
    };
    
    setCameras(prev => [...prev, newCamera]);
    setNewCameraName('');
    setNewCameraLocation('');
    setShowAddCamera(false);
    setShowQRScanner(false);
  };

  const simulateQRScan = () => {
    setShowQRScanner(true);
    setTimeout(() => {
      setShowQRScanner(false);
      setShowAddCamera(true);
    }, 2000);
  };

  const onlineCameras = cameras.filter(c => c.isOnline).length;

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      <div className="px-6 pt-12 pb-6 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Cameras</h1>
          <p className="text-muted-foreground mt-1">{onlineCameras} of {cameras.length} online</p>
        </div>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium card-shadow transition-colors ${
            isEditing ? 'bg-primary text-primary-foreground' : 'bg-card text-foreground'
          }`}
        >
          {isEditing ? 'Done' : 'Edit'}
        </button>
      </div>

      <div className="flex-1 px-6 space-y-4">
        {/* Main Camera View */}
        <div className="bg-card rounded-2xl overflow-hidden shadow-sm">
          <div className="aspect-video bg-muted flex items-center justify-center relative">
            <Camera className="w-16 h-16 text-muted-foreground" />
            {selectedCamera && cameras.find(c => c.id === selectedCamera)?.isRecording && (
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <Circle className="w-3 h-3 fill-red-500 text-red-500 animate-pulse" />
                <span className="text-sm text-white bg-black/50 px-2 py-1 rounded">REC</span>
              </div>
            )}
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-foreground">
              {cameras.find(c => c.id === selectedCamera)?.name || 'Select a camera'}
            </h3>
            <p className="text-muted-foreground text-sm">
              {cameras.find(c => c.id === selectedCamera)?.location}
            </p>
          </div>
        </div>

        {/* Camera List */}
        <div className="space-y-3">
          {cameras.map((camera) => (
            <div
              key={camera.id}
              className={`w-full bg-card rounded-2xl p-4 shadow-sm flex items-center justify-between ${
                selectedCamera === camera.id ? 'ring-2 ring-primary' : ''
              } ${!camera.isOnline ? 'opacity-50' : ''}`}
            >
              <button
                onClick={() => camera.isOnline && setSelectedCamera(camera.id)}
                className="flex items-center gap-4 flex-1"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  camera.isOnline ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  <Camera className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h4 className="font-medium text-foreground">{camera.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${camera.isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
                    <span className="text-muted-foreground text-sm">
                      {camera.isOnline ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>
              </button>
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <button
                    onClick={() => removeCamera(camera.id)}
                    className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center text-destructive"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                ) : camera.isOnline && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleRecording(camera.id);
                    }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      camera.isRecording ? 'bg-red-500 text-white' : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {camera.isRecording ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add Camera Button */}
        <button
          onClick={simulateQRScan}
          className="w-full py-4 border-2 border-dashed border-muted-foreground/30 rounded-2xl flex items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add Camera</span>
        </button>
      </div>

      {/* QR Scanner Dialog */}
      <Dialog open={showQRScanner} onOpenChange={setShowQRScanner}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle>Scan Camera QR Code</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center py-8">
            <div className="w-48 h-48 border-2 border-dashed border-primary rounded-2xl flex items-center justify-center mb-4 animate-pulse">
              <QrCode className="w-24 h-24 text-primary" />
            </div>
            <p className="text-muted-foreground text-sm">Scanning for camera...</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Camera Details Dialog */}
      <Dialog open={showAddCamera} onOpenChange={setShowAddCamera}>
        <DialogContent className="sm:max-w-md bg-card border-border">
          <DialogHeader>
            <DialogTitle>Camera Found!</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <Camera className="w-8 h-8 text-green-600" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cameraName">Camera Name</Label>
              <Input
                id="cameraName"
                placeholder="e.g., Kitchen Camera"
                value={newCameraName}
                onChange={(e) => setNewCameraName(e.target.value)}
                className="bg-muted border-border"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cameraLocation">Location</Label>
              <Input
                id="cameraLocation"
                placeholder="e.g., Kitchen"
                value={newCameraLocation}
                onChange={(e) => setNewCameraLocation(e.target.value)}
                className="bg-muted border-border"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowAddCamera(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={handleAddCamera}
                disabled={!newCameraName.trim()}
              >
                Add Camera
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
};

export default CameraStatus;
