"use client";

import React, { useState } from "react";

export default function LoginForm({
  onLogin,
}: {
  onLogin: (token: string) => void;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onLogin("mock-jwt-token");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-4 max-w-xs mx-auto'
    >
      <input
        className='border p-2 rounded'
        type='text'
        placeholder='Username'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className='border p-2 rounded'
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className='bg-blue-600 text-white rounded p-2' type='submit'>
        Login
      </button>
    </form>
  );
}
