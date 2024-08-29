import origins from "../assets/songs/origins.jpg";
import nntba from "../assets/songs/nntba.jpg";
import dissolve from "../assets/songs/dissolve.jpg";
import lights from "../assets/songs/lights.jpg";

export interface MusicConfig {
  name: string;
  link: string;
  img: string;
  songdesc: string;
  time: string;
}

export const MusicConfig: MusicConfig[] = [
  {
    name: "Origins (Original Mix)",
    link: "https://open.spotify.com/track/1TyNiK1QL1lEBG1pILntgL?si=06ba8c2bcbc749fe",
    img: origins.src,
    time: "2024",
    songdesc:
      "This is my first ever release on spotify. The song traces its roots from a random evening in Oct '22. Worked on it and left it because I wasn't happy. around an year later, picked it up again, made a shit ton of iterations, even added vocals, but ended up removing it and just keeping it as is. I understand that this type of music you usually find in youtube tutorials or something but hey, at least I have something that I can call mine :>",
  },
  {
    name: "Anna Mia- No Need To Be Afraid (remix)",
    link: "https://soundcloud.com/mohammed-arhum/anna-mia-no-need-to-be-afraid-remix",
    img: nntba.src,
    time: "2023",
    songdesc:
      "This is actually an inbuilt project in FL Studio, which i just randomly started flipping. Fun fact while in the middle of making it, I sent a half baked version to it as an entry in Production Competition and ended up advancing to the next round lmao. They ghosted me after that but I ended up finishing it with a drum and bass drop, my first time making it hehe",
  },
  {
    name: "Absofacto- dissolve (remix)",
    link: "https://soundcloud.com/mohammed-arhum/absofacto-dissolve-remix",
    img: dissolve.src,
    time: "Early 2022",
    songdesc:
      "This is, statistically my most streamed track. nothing much to say but really tried to go radio friendly here :D",
  },
  {
    name: "Lane 8- Brightest Lights (remix)",
    link: "https://soundcloud.com/mohammed-arhum/lane-8-brightest-lights-mohammed-arhum-extended-remix",
    img: lights.src,
    time: "2020",
    songdesc:
      "This is, on paper, my first track that I put out there in any website. Made this during lockdown as an entry for a remix competition. Didn't win anything but atleast got a chance to work on real, professional stems for the first time. Upwards from here! ",
  },
];
