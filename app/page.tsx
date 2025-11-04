"use client";

import { useState, useRef, useEffect } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessIcon, setShowSuccessIcon] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contactBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node) &&
        contactBtnRef.current &&
        !contactBtnRef.current.contains(e.target as Node)
      ) {
        if (showForm) {
          setShowForm(false);
        }
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showForm]);

  const handleContactClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowForm(true);
    setTimeout(() => {
      emailInputRef.current?.focus();
    }, 200);
  };

  const showMessage = (text: string, type: "success" | "error") => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 5000);
  };

  const handleSubmit = async () => {
    const emailValue = email.trim();

    if (!emailValue) {
      showMessage("Please enter an email address", "error");
      return;
    }

    if (!emailValue.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      showMessage("Please enter a valid email address", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailValue }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send email");
      }

      showMessage("Email sent successfully!", "success");
      setEmail("");

      // Show success icon flash, hide form and email button
      setShowForm(false);
      setShowSuccessIcon(true);
      setTimeout(() => {
        setShowSuccessIcon(false);
      }, 2000);
    } catch (error) {
      showMessage(
        error instanceof Error ? error.message : "Failed to send email",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <>
      <div className={`success-icon ${showSuccessIcon ? "show" : ""}`}>
        <FaCircleCheck />
      </div>

      <button
        ref={contactBtnRef}
        className={`contact-btn ${showForm || showSuccessIcon ? "hide" : ""}`}
        onClick={handleContactClick}
      >
        <IoMdMail />
      </button>

      <h1>GROVE HILL RESEARCH</h1>

      <div
        ref={containerRef}
        className={`email-container ${showForm ? "show" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="input-wrapper">
          <input
            ref={emailInputRef}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter your email"
            required
          />
          <button
            className={`submit-btn ${email.trim() ? "active" : ""}`}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "..."
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L311.5 290H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.5L190.5 100.8c-9.4-9.4-9.4-24.6 0-33.9z" />
              </svg>
            )}
          </button>
        </div>
        <div
          className={`message ${message.text ? "show" : ""} ${message.type}`}
        >
          {message.text}
        </div>
      </div>
    </>
  );
}
