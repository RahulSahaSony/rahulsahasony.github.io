// src/pages/About.tsx
import { profile } from "@/data/profile";
import { Chip } from "@/components/UI/Chip";
import { Divider } from "@/components/UI/Divider";

export const About = () => {
  return (
    <div className="container max-w-4xl py-12">
      <section className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tighter">About</h1>
        <Divider />
        
        <div className="space-y-4 text-muted-foreground max-w-[700px]">
          <p>
            I am a Business Analytics graduate student at The George Washington University with a strong background in data science, machine learning, and business strategy. My passion lies in leveraging data to drive business decisions and create impactful solutions.
          </p>
          <p>
            With experience in both technical and business roles, I bring a unique perspective to analytics projects. I have worked on diverse projects ranging from time series forecasting to explainable ML models, always with a focus on practical applications and ethical considerations.
          </p>
          <p>
            My goal is to bridge the gap between technical expertise and business needs, helping organizations make data-driven decisions that lead to meaningful outcomes.
          </p>
        </div>
      </section>
      
      <Divider className="my-12" />
      
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tighter">Skills</h2>
        <div className="space-y-6">
          {profile.skillGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-lg font-medium mb-3">{group.title}</h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <Chip key={skill}>{skill}</Chip>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <Divider className="my-12" />
      
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tighter">Education</h2>
        <div className="space-y-6">
          {profile.education.map((edu) => (
            <div key={edu.id}>
              <h3 className="text-lg font-medium">{edu.degree}</h3>
              <p className="text-muted-foreground">{edu.school}</p>
              <p className="text-sm text-muted-foreground">{edu.period}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
