import {
  Airplay,
  Codesandbox,
  Icon,
  Clock,
  BookOpen,
  Briefcase,
} from "react-feather";

export interface timelineConfig {
  icon: Icon;
  time: String;
  title: String;
  body: String;
}

export interface jobtimelineConfig {
  icon: Icon;
  time: String;
  title: String;
  body: String;
}

export const timelineConfig: timelineConfig[] = [
  {
    icon: Codesandbox,
    time: "~13.8B years ago",
    title: "Big Bang",
    body: "Super sad event, booooooo!",
  },
  {
    icon: Clock,
    time: "December 2001: Ghaziabad, IN",
    title: "Birth of yours truly",
    body: "Super cool :D",
  },
  {
    icon: BookOpen,
    time: "March 2018- Vidyut Nagar, Dadri",
    title: "Secondary School, DPS",
    body: "Nothing much to say, had a score of 94% in AISSE 2018",
  },
  {
    icon: BookOpen,
    time: "March 2020- Vidyut Nagar, Dadri",
    title: "Senior Secondary School, DPS",
    body: "aggregate of 91% in AISSCE 2020",
  },
  {
    icon: BookOpen,
    time: "June 2024, Chennai, TN",
    title: "Bachelor's of Technology, SRMIST",
    body: "Computer Science and Engineering; 8.46 CGPA",
  },
];

export const jobtimelineConfig: jobtimelineConfig[] = [
  {
    icon: Briefcase,
    time: "April 2024- Chennai, TN",
    title: "Software Engineering Intern @ RandomWalk.AI",
    body: "Worked on technologies like Flutter, Python, GCP, Java, Spring Boot",
  },
  {
    icon: Briefcase,
    time: "Jul 2024- Chennai, TN",
    title: "Junior Software Engineer @ RandomWalk.AI",
    body: "Currently doing Backend Development using Spring Boot with frameworks like Spring Web, Security, Hibernate, WebFlux, Jooby and managed AWS infra using Terraform",
  },
];
