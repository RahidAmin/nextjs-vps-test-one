"use client";

import { useEffect, useState } from "react";

interface IUser {
  _id?: string;
  name: string;
  age: number;
  gender: string;
}

export default function Home() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
  });

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data: IUser[] = await res.json();
    setUsers(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        age: Number(form.age),
        gender: form.gender,
      }),
    });

    setForm({ name: "", age: "", gender: "" });
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <main style={{ padding: 20 }}>
      <h1>User Cards</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
        />
        <input
          placeholder="Gender"
          value={form.gender}
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
        />
        <button type="submit">Add</button>
      </form>

      {/* Cards */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {users.map((user) => (
          <div
            key={user._id}
            style={{
              border: "1px solid #ccc",
              padding: 12,
              width: 160,
            }}
          >
            <p><b>Name:</b> {user.name}</p>
            <p><b>Age:</b> {user.age}</p>
            <p><b>Gender:</b> {user.gender}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
