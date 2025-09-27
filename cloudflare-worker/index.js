// Cloudflare Worker for NeonDB events API for rose-onboarding
// Uses Neon HTTP driver for serverless Postgres
import { neon } from "@neondatabase/serverless";

const DATABASE_URL = "postgresql://neondb_owner:npg_RlAMaKg0TS9w@ep-soft-block-agcnmiyw-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require";
const sql = neon(DATABASE_URL);

export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }
    if (url.pathname === "/events" && request.method === "GET") {
      // List all events
      try {
        const result = await sql`SELECT * FROM public.events ORDER BY id DESC`;
        return jsonResponse(result);
      } catch (err) {
        return errorResponse(err);
      }
    }
    if (url.pathname === "/events" && request.method === "POST") {
      try {
        const body = await request.json();
        if (!body.name || !body.date) {
          return errorResponse("Missing name or date", 400);
        }
        const result = await sql`
          INSERT INTO public.events (name, date, description)
          VALUES (${body.name}, ${body.date}, ${body.description || null})
          RETURNING *
        `;
        return jsonResponse(result[0], 201);
      } catch (err) {
        return errorResponse(err);
      }
    }
    return new Response("Not found", { status: 404, headers: corsHeaders });
  },
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

function errorResponse(err, status = 500) {
  return new Response(
    JSON.stringify({ error: err.message || err.toString() }),
    { status, headers: { "Content-Type": "application/json", ...corsHeaders } }
  );
}
