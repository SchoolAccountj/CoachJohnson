import { Link } from "wouter";
import { BookOpen, Beaker, PiSquare, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const subjects = [
  { name: "Mathematics", slug: "math", icon: PiSquare },
  { name: "Science", slug: "science", icon: Beaker },
  { name: "English", slug: "english", icon: BookOpen },
  { name: "Social Studies", slug: "social-studies", icon: Globe },
];

export function SubjectNav({ className }: { className?: string }) {
  return (
    <nav className={cn("flex flex-col space-y-2", className)}>
      {subjects.map((subject) => (
        <Link key={subject.slug} href={`/subjects/${subject.slug}`}>
          <a className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-accent transition-colors">
            <subject.icon className="w-5 h-5" />
            <span>{subject.name}</span>
          </a>
        </Link>
      ))}
    </nav>
  );
}