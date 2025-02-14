import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShinyHead } from "@/components/ShinyHead";
import { motion } from "framer-motion";

export default function Home() {
  const [shineIntensity, setShineIntensity] = useState(0.5);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/10">
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
            Coach Johnson's Glorious Dome
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Tracking the Journey of a Legendary Hairline
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="backdrop-blur-lg bg-background/80">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">The Receding Saga</h2>
              <p className="text-muted-foreground">
                Watch in amazement as Coach Johnson's hairline plays the ultimate game of hide and seek!
              </p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-lg bg-background/80">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Shine Factor</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Adjust the shine level of Coach's magnificent dome!
                </p>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={shineIntensity}
                  onChange={(e) => setShineIntensity(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-lg bg-background/80">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Fun Facts</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>More aerodynamic during basketball drills</li>
                <li>Natural reflector for gym lighting</li>
                <li>Saves money on shampoo</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <ShinyHead intensity={shineIntensity} />
        </div>
      </main>
    </div>
  );
}