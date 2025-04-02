import django from "../assets/logos/django.svg";
import gcp from "../assets/logos/gcp.svg";
import linux from "../assets/logos/linuxcolor.svg";
import mysql from "../assets/logos/mysqlcolor.svg";
import njs from "../assets/logos/njs.svg";
import rjs from "../assets/logos/rjs.svg";
import py from "../assets/logos/py.svg";
import js from "../assets/logos/js.svg";
import ts from "../assets/logos/ts.svg";
import tf from "../assets/logos/terraform.png";
import sprng from "../assets/logos/sprng.svg"

export interface ProjectCardConfig {
  title: string;
  projectDesc: string[];
  projectLink: string;
  images: string[];
  category: string;
}

export const ProjectCardConfig: ProjectCardConfig[] = [
  {
    title: "Spring based whitelisting tool for firewalls on Google Cloud Platform",
    projectDesc: [
      "Developed a website to add user IPs to GCP Firewall, granting access to a game server",
      "Built with Spring Boot APIs, Next.js frontend, and CI/CD on Cloud Run via Powershell via Artifact registry",
    ],
    projectLink: "https://apparentlyarhm.github.io/minecraft-vm-management-console/",
    images: [sprng.src, njs.src, gcp.src],
    category: "Personal",
  },
  {
    title: "This site lol :D",
    projectDesc: [
      "Honestly, nothing much to say here. I was able to find some spare time while working here in Chennai (Aug '24) so thought its the best time to get my hands dirty on proper TypeScript/Next combo and NextUI on top of that made the process fun.",
    ],
    projectLink: "https://github.com/apparentlyarhm/notaportfolio",
    images: [ts.src, njs.src],
    category: "Personal",
  },

  {
    title: "Infra Code for Minecraft Server- GCP",
    projectDesc: [
      "This is mostly an extension to the Game Server project I made for GCP",
      "This infra code is mostly the entry point for anyone looking for an easy way to own a minecraft server on GCP",
    ],
    projectLink: "https://github.com/apparentlyarhm/minecraft-terraform",
    images: [tf.src, linux.src],
    category: "Personal",
  },
  {
    title: "Fully Randomized Examination system using Django",
    projectDesc: [
      "Implemented a centralized database-driven approach to generate fully randomized question paper using attributes like difficulty levels, utlizing APIs built in Django that picks questions ensuring constraint requirements and updates the frontend.",
    ],
    projectLink: "https://github.com/apparentlyarhm/randomexamapp",
    images: [django.src, gcp.src, js.src, mysql.src, py.src],
    category: "Personal",
  },
  {
    title:
        " Game Server using GCE with automatic backups and URL based Startup using Cloud Functions",
    projectDesc: [
      " Used tools like Compute Engine, CRON, TMUX to host and maintain a game server with regular backups.",
    ],
    projectLink: "",
    images: [gcp.src, linux.src],
    category: "Personal",
  },
  {
    title:
        "Gobbl- A 'Surplus' Food Redistribution System: SRMIST MINOR PROJECT",
    projectDesc: [
      "A system that predicts best possible restaurant choices at a given location based on Quantity, Distance and Rating",
      "A biased, synthetic dataset was used for training, as well as a Web App developed using React.Js and Django",
    ],
    projectLink: "https://github.com/apparentlyarhm/foodredis",
    images: [django.src, mysql.src, rjs.src, py.src],
    category: "Personal",
  },
];
