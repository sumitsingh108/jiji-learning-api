import app from "./app.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

import express from "express";
import askJijiRoutes from "./routes/askJiji.routes.js";

const app = express();

app.use(express.json());
app.use("/ask-jiji", askJijiRoutes);

export default app;


import express from "express";
import { askJiji } from "../controllers/askJiji.controller.js";

const router = express.Router();

router.post("/", askJiji);

export default router;



import { handleQuery } from "../services/jiji.service.js";

export const askJiji = async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  const response = await handleQuery(query);
  res.status(200).json(response);
};


Supabase SQL Migration (RLS Included)

-- Profiles
create table profiles (
  id uuid primary key references auth.users(id),
  name text
);

-- Queries
create table queries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  query text not null,
  created_at timestamp default now()
);

-- Resources
create table resources (
  id uuid primary key default gen_random_uuid(),
  title text,
  type text,
  storage_url text
);

-- Enable RLS
alter table queries enable row level security;

-- Policy
create policy "Users can read own queries"
on queries
for select
using (auth.uid() = user_id);



