import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import type { AsmrTrack } from "@shared/schema";

export function ASMRPlayer({ track }: { track: AsmrTrack }) {
  const [volume, setVolume] = useState([50]);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <Card className="backdrop-blur-lg bg-background/80">
      <CardHeader>
        <CardTitle className="text-lg">{track.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5" />
            ) : (
              <Volume2 className="h-5 w-5" />
            )}
          </Button>
          <Slider
            value={volume}
            onValueChange={setVolume}
            max={100}
            step={1}
            className="w-[200px]"
          />
        </div>
      </CardContent>
    </Card>
  );
}
