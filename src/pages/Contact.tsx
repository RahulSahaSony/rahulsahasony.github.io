// src/pages/Contact.tsx
import { Mail, MapPin, Linkedin, Github } from "lucide-react";
import { profile } from "@/data/profile";
import { Card, CardContent } from "@/components/UI/Card";
import { Divider } from "@/components/UI/Divider";

export const Contact = () => {
  return (
    <div className="container max-w-4xl py-12">
      <section className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tighter">Contact</h1>
        <Divider />
        
        <div className="space-y-4 text-muted-foreground max-w-[700px]">
          <p>
            I'm always interested in hearing about new opportunities and exciting projects. 
            Whether you have a question or just want to say hi, feel free to reach out!
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 mt-8">
          <Card>
            <CardContent className="flex items-center space-x-4 p-6">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <a href={`mailto:${profile.contact.email}`} className="text-sm text-muted-foreground hover:text-foreground">
                  {profile.contact.email}
                </a>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center space-x-4 p-6">
              <Linkedin className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">LinkedIn</p>
                <a href={profile.contact.linkedin} className="text-sm text-muted-foreground hover:text-foreground" target="_blank" rel="noreferrer">
                  linkedin.com/in/rahulsahasony
                </a>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center space-x-4 p-6">
              <Github className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">GitHub</p>
                <a href={profile.contact.github} className="text-sm text-muted-foreground hover:text-foreground" target="_blank" rel="noreferrer">
                  github.com/rahulsahasony
                </a>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="flex items-center space-x-4 p-6">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Location</p>
                <p className="text-sm text-muted-foreground">{profile.contact.location}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-8 p-4 border-l-4 border-blue-500 bg-blue-500/10 rounded-r-md">
          <p className="text-sm font-medium">Best way to reach me:</p>
          <p className="text-sm text-muted-foreground mt-1">{profile.contact.bestWayToReach}</p>
        </div>
      </section>
    </div>
  );
};
