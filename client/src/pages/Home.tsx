import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ShinyHead } from "@/components/ShinyHead";
import { motion } from "framer-motion";
import { ArrowDownCircle } from "lucide-react";

const baldAdvantages = [
  {
    title: "Aerodynamic Excellence",
    description: "Reduced wind resistance during intense basketball drills. Scientific studies* show a 15% increase in speed! (*studies conducted in Coach Johnson's imagination)",
    icon: "🏃‍♂️"
  },
  {
    title: "Natural Lighting System",
    description: "Why install more gym lights when your head can reflect existing ones? Coach's dome provides auxiliary lighting during power outages.",
    icon: "💡"
  },
  {
    title: "Economic Benefits",
    description: "Save hundreds annually on shampoo, conditioner, and haircuts. Invest that money in more basketballs!",
    icon: "💰"
  },
  {
    title: "Temperature Regulation",
    description: "Natural cooling system in summer, just add a beanie in winter. Nature's thermostat!",
    icon: "🌡️"
  },
  {
    title: "Time Management",
    description: "Zero minutes spent on hair maintenance means more time for coaching. That's efficiency!",
    icon: "⏰"
  },
  {
    title: "Intimidation Factor",
    description: "A shiny dome adds +5 to authority stats when giving pep talks to the team.",
    icon: "💪"
  }
];

export default function Home() {
  const [shineIntensity, setShineIntensity] = useState(0.5);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/10">
      {/* Creator Credit */}
      <div className="absolute top-4 left-4 text-sm text-muted-foreground">
        Created and Coded by Noah Perkins
      </div>

      <main className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="min-h-screen flex flex-col items-center justify-center text-center"
        >
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
            Coach Johnson's Glorious Dome
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Tracking the Journey of a Legendary Hairline
          </p>

          <ShinyHead intensity={shineIntensity} />

          <div className="mt-8 w-full max-w-md">
            <p className="text-muted-foreground mb-4">Adjust the Shine Factor™</p>
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

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mt-12"
          >
            <ArrowDownCircle className="w-8 h-8 text-primary animate-bounce" />
            <p className="text-sm text-muted-foreground">Scroll to discover the powers of baldness</p>
          </motion.div>
        </motion.div>

        {/* Advantages Section */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">The Supreme Powers of Baldness</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {baldAdvantages.map((advantage, index) => (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="backdrop-blur-lg bg-background/80 h-full">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">{advantage.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{advantage.title}</h3>
                    <p className="text-muted-foreground">{advantage.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}