"use client"

import React from "react";
import { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        username, 
        password 
      }),
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => alert(error.message));
  }

  return (
    <section className="bg-primary min-h-screen flex flex-col items-center justify-center gap-8">
      <h1 className="text-2xl font-semibold">Form Login</h1>
      <form className="flex flex-col items-center gap-6" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-2">
          <span className="font-semibold">Username</span>
          <input 
            type="text"
            placeholder="Username"
            required
            className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-64 bg-white text-black focus:border-red-primary"
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="font-semibold">Password</span>
          <input 
            type="password"
            placeholder="Password"
            required
            className="border-4 transition-all border-solid rounded-lg px-3 py-1.5 w-64 bg-white text-black focus:border-red-primary"
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button type="submit" className="hover:scale-105 active:scale-95 active:opacity-70 transition-all bg-red-primary w-28 justify-center flex rounded-lg py-1.5 font-semibold">
          Masuk
        </button>
        <span>
          Belum punya akun? <a href="/register" className="text-red-primary hover:underline">Register</a>
        </span>
      </form>
    </section>
  );
}