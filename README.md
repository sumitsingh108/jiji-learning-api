# Learn with Jiji – Backend Service

Backend service powering Jiji’s search-and-respond learning flow.

## Tech Stack
- Node.js + Express
- Supabase (DB, Auth, Storage)
- PostgreSQL

## API Endpoint
### POST /ask-jiji
**Request**
```json
{
  "query": "Explain RAG"
}
