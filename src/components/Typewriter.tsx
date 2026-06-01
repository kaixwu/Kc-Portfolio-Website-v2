"use client";

import React, { useState, useEffect } from "react";

interface TypewriterProps {
  roles: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

export default function Typewriter({
  roles,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseTime = 1500,
}: TypewriterProps) {
  const [text, setText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeoutId: NodeJS.Timeout;

    if (isDeleting) {
      if (text.length === 0) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        timeoutId = setTimeout(() => {
          setText(currentRole.substring(0, text.length - 1));
        }, deletingSpeed);
      }
    } else {
      if (text.length === currentRole.length) {
        timeoutId = setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
      } else {
        timeoutId = setTimeout(() => {
          setText(currentRole.substring(0, text.length + 1));
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [text, isDeleting, roleIndex, roles, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className="typewriter-text">
      {text}
      <span className="blinking-cursor">|</span>
    </span>
  );
}
