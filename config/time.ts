import {
  Codesandbox,
  Icon,
  Clock,
  BookOpen,
  Briefcase,
} from "react-feather";

export interface timelineConfig {
  icon: Icon;
  metadata: String[];
  title: String;
  body: String;
}

export interface jobtimelineConfig {
  icon: Icon;
  metadata: String[];
  title: String;
  body: String;
}

export const timelineConfig: timelineConfig[] = [
  {
    icon: Codesandbox,
    metadata: ["~13.8B years ago"],
    title: "Big Bang",
    body: "it happened; Ive fact checked.",
  },
  {
    icon: Clock,
    metadata: ["December 2001", "Ghaziabad, IN"],
    title: "Birth of yours truly",
    body: "also fact checked",
  },
  {
    icon: BookOpen,
    metadata: ["March 2018", "Vidyut Nagar, Dadri"],
    title: "Secondary School, DPS (10th Grade)",
    body: "aggregate of 94% in AISSE 2018",
  },
  {
    icon: BookOpen,
    metadata: ["March 2020", "Vidyut Nagar, Dadri"],
    title: "Senior Secondary School, DPS (12th Grade)",
    body: "aggregate of 91% in AISSCE 2020",
  },
  {
    icon: BookOpen,
    metadata: ["Batch of '24", "kattankulathur, Chennai, TN"],
    title: "Bachelor's of Technology, SRMIST",
    body: "Computer Science and Engineering; 8.46 CGPA",
  },
];

export const jobtimelineConfig: jobtimelineConfig[] = [
  {
    icon: Briefcase,
    metadata: ["April 2024 - June 2024 ", "Chennai, TN"],
    title: "Software Engineering Intern @ RandomWalk.AI",
    body: "Worked on technologies like Flutter, Python, GCP, Java, Spring Boot",
  },
  {
    icon: Briefcase,
    metadata: ["Jul 2024 - June 2025", "Chennai, TN"],
    title: "Junior Software Engineer @ RandomWalk.AI",
    body: "Mostly involeved in backend development, working with AWS, Spring Boot, Spring Batch, and Terraform and DB stuff. Also have experience working with LLMs, LangGraph.",
  },
];
