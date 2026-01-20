// src/pages/Experience.tsx
import { profile } from "@/data/profile";
import { Divider } from "@/components/UI/Divider";

export const Experience = () => {
  return (
    <div className="container max-w-4xl py-12">
      <section className="space-y-8">
        <h1 className="text-3xl font-bold tracking-tighter">Experience</h1>
        
        <div className="space-y-8">
          {profile.experience.map((exp, index) => (
            <div key={exp.id}>
              <div className="space-y-2">
                <h3 className="text-xl font-medium">{exp.title}</h3>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <p className="text-muted-foreground">{exp.company}</p>
                  <p className="text-sm text-muted-foreground">{exp.period}</p>
                </div>
                <p className="text-sm text-muted-foreground">{exp.location}</p>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </div>
              {index < profile.experience.length - 1 && <Divider className="mt-8" />}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
