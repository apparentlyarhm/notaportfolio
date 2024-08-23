import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import pokeball from "../assets/logos/pokeball.svg";
import pokeboom from "../assets/logos/pokemonexp.svg";
import croc from "../assets/logos/croc.svg";

const PokemonThing: React.FC = () => {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");
  const [showBomb, setShowBomb] = useState(true);
  const controlsPenguin = useAnimation();
  const controlsBomb = useAnimation();
  const penguinRef = useRef<HTMLDivElement>(null);
  const bombRef = useRef<HTMLDivElement>(null);

  const [visibleElements, setVisibleElements] = useState<Element[]>([]);

  const messageTimeout = 3000;

  // Function to update the bomb's position to match the penguin's
  const syncBombWithPenguin = () => {
    if (penguinRef.current && bombRef.current) {
      const penguinRect = penguinRef.current.getBoundingClientRect();
      controlsBomb.set({
        x: penguinRect.left,
        y: penguinRect.top,
      });
    }
  };
  // Old Function that is dependent on the server for tracking

  // const fetchUserStatus = async () => {
  //   try {
  //     const response = await fetch("http://localhost:8000/apis/track-user/", {
  //       method: "GET",
  //       credentials: "include", // Include cookies in the request
  //     });
  //     const data = await response.json();
  //     setMessage(data.message);
  //   } catch (error) {
  //     console.error("Error fetching user status:", error);
  //     console.log(document.cookie);
  //     setMessage("Failed to connect to the server.");
  //   }
  // };

  const fetchUserStatus = async () => {
    try {
      const a = document.cookie;
      if (a) {
        if (a.includes("isReturning=true")) {
          console.log("found cookie!");
          setMessage("Welcome Back!");
        } else {
          console.log("else is running for some reason");
          setMessage(
            "Welcome to our site! We hope you enjoy your first visit!"
          );
        }
      } else {
        // If no cookie is found, fallback to making a fetch request
        const response = await fetch(
          "http://localhost:8000/apis/track-user-v2/",
          {
            method: "GET",
            credentials: "include", // Include cookies in the request
          }
        );
        const data = await response.json();
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error fetching user status:", error);
      setMessage("Failed to connect to the server.");
    }
  };

  useEffect(() => {
    fetchUserStatus(); // Fetch user status on component mount
  }, []);

  useEffect(() => {
    console.log("observer init");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => [...prev, entry.target]);
          } else {
            setVisibleElements((prev) =>
              prev.filter((element) => element !== entry.target)
            );
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    const elementsToObserve = Array.from(
      document.querySelectorAll("p, a, span, h1, h2, h3, h4, h5,li")
    );
    elementsToObserve.forEach((element) => observer.observe(element));
    // setMessage("Found " + elementsToObserve.length + " Possible Positions!");
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const randomTranslate = () => {
      const rndX = Number(Math.random().toFixed(1)) * window.innerWidth;
      const randomY = window.innerHeight - 120;

      setMessage("Gotta catch them all....");

      controlsPenguin.start({
        x: rndX,
        y: randomY,
        transition: { duration: 5, ease: "easeInOut" },
      });

      // Synchronize bomb's position with the penguin after the penguin moves
      controlsPenguin
        .start({
          x: rndX,
          y: randomY,
          transition: { duration: 5, ease: "easeInOut" },
        })
        .then(() => {
          syncBombWithPenguin();
        });

      setTimeout(() => setMessage(""), messageTimeout);
    };

    const interval = setInterval(() => {
      randomTranslate();
    }, 5000);

    return () => clearInterval(interval);
  }, [controlsPenguin]);

  const handleSearchAndTranslate = async () => {
    setMessage("Searching...");

    const targetElement = visibleElements.find((element) =>
      element.textContent?.toLowerCase().includes(inputValue.toLowerCase())
    );

    if (targetElement) {
      setMessage("You will be mine!!!!!");

      const targetRect = targetElement.getBoundingClientRect();
      const targetX = targetRect.left + targetRect.width / 2;
      const targetY = targetRect.top + targetRect.height / 2;

      // Make the bomb visible
      await controlsBomb.start({
        opacity: 1,
        transition: { duration: 0.2 },
      });

      // Move the bomb to the target element
      await controlsBomb.start({
        x: targetX,
        y: targetY,
        transition: {
          duration: 3,
          type: "",
          stiffness: 300,
          damping: 20,
        },
      });

      setShowBomb(false);

      setTimeout(() => {
        const randomRotation = Math.floor(Math.random() * 90) - 45; // Rotate between -45 and 45 degrees
        // (targetElement as HTMLElement).style.transform =
        //   `rotate(${randomRotation}deg)`;
        // (targetElement as HTMLElement).style.border = `2px solid red`;
        // (targetElement as HTMLElement).style.boxShadow = `10px 5px 5px gray`;
        (targetElement as HTMLElement).style.opacity = `0`;
        setTimeout(async () => {
          setShowBomb(true);
          syncBombWithPenguin();
          await controlsBomb.start({
            opacity: 0,
            transition: { duration: 0.2 },
          });
        }, 750);
      }, 300);
    } else {
      setMessage("No target exists bud :|");
      console.log("No element in the viewport matches the search term.");
    }

    // Hide message after a few seconds
    setTimeout(() => setMessage(""), messageTimeout);
  };
  return (
    <>
      <motion.div
        ref={penguinRef}
        animate={controlsPenguin}
        initial={{ x: 100, y: 100 }}
        whileHover={{ scale: 1.2 }}
        drag
        onClick={() => setInputVisible(true)}
        dragElastic={0.2}
        whileDrag={{ scale: 1.1 }}
        className="fixed top-0 left-0 w-32 h-32 rounded-xl z-50"
      >
        <div style={{ pointerEvents: "none" }}>
          <Image
            id="penguin"
            src={croc.src}
            height={250}
            width={250}
            alt="Penguin"
          />
        </div>
        {message && (
          <div
            id="speechBubble"
            className="absolute left-20 -top-20 bg-white text-black p-2 rounded-md shadow-md"
          >
            <p className="max-w-full overflow-hidden">{message}</p>
          </div>
        )}
        {inputVisible && (
          <div className="absolute -top-6 -left-60 bg-white text-black p-2 rounded-md shadow-md">
            <input
              className="p-1 z-10"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchAndTranslate();
                  setInputVisible(false);
                }
              }}
              placeholder="target, boss?"
            />
          </div>
        )}
      </motion.div>
      <motion.div
        style={{ opacity: 0 }}
        ref={bombRef}
        animate={controlsBomb}
        initial={{ x: "50%", y: "50%" }}
        className="fixed top-0 left-10 w-16 h-16 bg-transparent rounded-full z-50 "
      >
        <Image
          id="bomb"
          src={showBomb ? pokeball.src : pokeboom.src}
          height={showBomb ? 35 : 200}
          width={showBomb ? 35 : 200}
          alt={showBomb ? "Bomb" : "Boom"}
        />
      </motion.div>
    </>
  );
};

export default PokemonThing;
