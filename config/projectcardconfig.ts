import django from "../assets/logos/django.svg";
import gcp from "../assets/logos/gcp.svg";
import linux from "../assets/logos/linuxcolor.svg";
import mysql from "../assets/logos/mysqlcolor.svg";
import njs from "../assets/logos/njs.svg";
import py from "../assets/logos/py.svg";
import js from "../assets/logos/js.svg";
import ts from "../assets/logos/ts.svg";
import tf from "../assets/logos/terraform.png";
import sprng from "../assets/logos/sprng.svg";
import ejs from "../assets/logos/ejs.svg";
import ps from "../assets/logos/ps.svg";

export interface ProjectCardConfig {
  title: string;
  projectDesc: string[];
  projectLink: string;
  images: string[];
  category: string;
  status: "live" | "partially-live" | "unreleased" | "deprecated";
}

export const ProjectCardConfig: ProjectCardConfig[] = [
  {
    title: "Spring based whitelisting tool for firewalls on Google Cloud Platform",
    projectDesc: [
      "A Spring Boot and Next.js based IP whitelisting platform for managing GCP Firewall rules, deployed via Cloud Run with CI/CD using PowerShell and Artifact Registry."
    ],
    projectLink: "https://apparentlyarhm.github.io/minecraft-vm-management-console/",
    images: [sprng.src, njs.src, gcp.src],
    category: "Personal",
    status: "partially-live"
  },
  {
    title: "Spoti-proxy",
    projectDesc: [
      "An Express.js proxy for accessing Spotify statistics with built-in token refresh and rate limiting, containerized and deployed on Cloud Run via GitHub Actions."
    ],
    projectLink: "https://github.com/apparentlyarhm/spotify-proxy/",
    images: [ejs.src, ps.src, gcp.src],
    category: "Personal",
    status: "live"
  },
  {
    title: "This site lol :D",
    projectDesc: [
      "A TypeScript and Next.js based portfolio site styled with NextUI, created during a work stint in Chennai as an exploration into the modern React ecosystem."
    ],
    projectLink: "https://github.com/apparentlyarhm/notaportfolio",
    images: [ts.src, njs.src],
    category: "Personal",
    status: "live"
  },
  {
    title: "Infra Code for Minecraft Server- GCP",
    projectDesc: [
      "A Terraform-based infrastructure stack for provisioning Minecraft servers on GCP, intended as an easy entry point for hosting game servers in the cloud."
    ],
    projectLink: "https://github.com/apparentlyarhm/minecraft-terraform",
    images: [tf.src, linux.src],
    category: "Personal",
    status: "unreleased"
  },
  {
    title: "Fully Randomized Examination system using Django",
    projectDesc: [
      "A Django-based examination engine utilizing a centralized database and constraint-based logic to dynamically generate randomized question sets with difficulty levels."
    ],
    projectLink: "https://github.com/apparentlyarhm/randomexamapp",
    images: [django.src, gcp.src, js.src, mysql.src, py.src],
    category: "Personal",
    status: "deprecated"
  },
  {
    title: "Game Server using GCE with automatic backups and URL based Startup using Cloud Functions",
    projectDesc: [
      "A GCE-hosted game server setup leveraging TMUX, CRON, and Cloud Functions for automated backups and URL-triggered startups."
    ],
    projectLink: "",
    images: [gcp.src, linux.src],
    category: "Personal",
    status: "deprecated"
  },
];
