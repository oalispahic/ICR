import { Camera, Circle, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { BottomNav } from "@/components/dashboard/BottomNav";
import { useState } from "react";

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

  const toggleRecording = (cameraId: string) => {
    setCameras(prev => prev.map(cam => 
      cam.id === cameraId ? { ...cam, isRecording: !cam.isRecording } : cam
    ));
  };

  const onlineCameras = cameras.filter(c => c.isOnline).length;

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      <div className="px-6 pt-12 pb-6">
        <h1 className="text-3xl font-semibold text-foreground">Cameras</h1>
        <p className="text-muted-foreground mt-1">{onlineCameras} of {cameras.length} online</p>
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
            <button
              key={camera.id}
              onClick={() => camera.isOnline && setSelectedCamera(camera.id)}
              className={`w-full bg-card rounded-2xl p-4 shadow-sm flex items-center justify-between ${
                selectedCamera === camera.id ? 'ring-2 ring-primary' : ''
              } ${!camera.isOnline ? 'opacity-50' : ''}`}
            >
              <div className="flex items-center gap-4">
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
              </div>
              {camera.isOnline && (
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
            </button>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default CameraStatus;
