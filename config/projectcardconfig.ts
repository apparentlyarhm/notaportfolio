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

export interface ProjectCardConfig {
  title: string;
  projectDesc: string[];
  projectLink: string;
  images: string[];
  category: string;
}

export const ProjectCardConfig: ProjectCardConfig[] = [
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
  {
    title: "Django based whitelist app for firewalls for Google Cloud Platform",
    projectDesc: [
      "Made a simple website that takes in Users public IP and adds it to the GCP Firewall, effectively granting access to a resource- a game server in this case",
      " Achieved using Secret Manager APIs, Service Accounts and IAM permissions combined with custom APIs made in Django",
      "Honestly, I host it whenever the gang needs it, earlier on vercel now in GH pages  ",
    ],
    projectLink: "https://github.com/apparentlyarhm/validateapp",
    images: [django.src, njs.src, gcp.src, py.src],
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
      "This infra code aims to set up everything automatically, from VMs to firewall rules as well as hosting the Django app for the same, given a GCP account.",
      "Also has scripts to download and configure Java, and all the stuff surrounding a typical minecraft server setup",
      "I really have big plans for this project, as and when I find time :>",
    ],
    projectLink: "https://github.com/apparentlyarhm/minecraft-terraform",
    images: [tf.src, linux.src],
    category: "Personal",
  },
];
