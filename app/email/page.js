"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function SendEmailPage() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [html, setHtml] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to, subject, text, html }),
      });

      if (response.ok) {
        setStatus("Email sent successfully!");
      } else {
        const error = await response.text();
        setStatus(`Failed to send email: ${error}`);
      }
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50">
      <div className="max-w-2xl mx-auto p-4 min-h-screen bg-yellow-50">
        <h1 className="text-2xl font-bold mb-4">Send Email</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="to" className="block mb-1">
              To:
            </label>
            <Input
              id="to"
              type="email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="subject" className="block mb-1">
              Subject:
            </label>
            <Input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="text" className="block mb-1">
              Text Content:
            </label>
            <Textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="html" className="block mb-1">
              HTML Content:
            </label>
            <Textarea
              id="html"
              value={html}
              onChange={(e) => setHtml(e.target.value)}
            />
          </div>
          <Button type="submit">Send Email</Button>
        </form>
        {status && <p className="mt-4">{status}</p>}
      </div>
    </div>
  );
}
