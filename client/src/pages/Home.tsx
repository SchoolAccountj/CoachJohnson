import { useQuery } from "@tanstack/react-query";
import { SubjectNav } from "@/components/SubjectNav";
import { ASMRPlayer } from "@/components/ASMRPlayer";
import { RainAnimation } from "@/components/RainAnimation";
import type { AsmrTrack } from "@shared/schema";

export default function Home() {
  const { data: tracks } = useQuery<AsmrTrack[]>({
    queryKey: ["/api/asmr-tracks"],
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <RainAnimation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <h2 className="text-2xl font-bold mb-4">Subjects</h2>
            <SubjectNav />
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9">
            <div className="space-y-8">
              <section>
                <h1 className="text-4xl font-bold mb-4">Study with ASMR</h1>
                <p className="text-muted-foreground mb-8">
                  Choose your subject and enjoy a relaxing study session with rain sounds.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">ASMR Tracks</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tracks?.map((track) => (
                    <ASMRPlayer key={track.id} track={track} />
                  ))}
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
