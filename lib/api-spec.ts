export interface ApiEndpoint {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  summary: string;
  auth: "none" | "bearer" | "api-key";
  tags: string[];
  requestBody?: object;
  responseExample: object;
}

export const apiEndpoints: ApiEndpoint[] = [
  {
    method: "POST",
    path: "/v1/auth/token",
    summary: "Obtain access token",
    auth: "none",
    tags: ["Auth"],
    requestBody: { client_id: "your_client_id", client_secret: "your_secret" },
    responseExample: { access_token: "eyJ...", expires_in: 3600, token_type: "Bearer" },
  },
  {
    method: "GET",
    path: "/v1/sessions",
    summary: "List shooting sessions",
    auth: "bearer",
    tags: ["Sessions"],
    responseExample: {
      data: [{ id: "sess_001", athlete_id: "ath_001", started_at: "2026-03-15T10:00:00Z", shot_count: 60 }],
    },
  },
  {
    method: "POST",
    path: "/v1/sessions",
    summary: "Create a new session",
    auth: "bearer",
    tags: ["Sessions"],
    requestBody: { athlete_id: "ath_001", discipline: "10m_air_rifle" },
    responseExample: { id: "sess_002", status: "active" },
  },
  {
    method: "GET",
    path: "/v1/sessions/{id}/shots",
    summary: "Get shots for a session",
    auth: "bearer",
    tags: ["Shots"],
    responseExample: {
      data: [{ id: "shot_001", x: 0.42, y: -0.38, score: 10.2, timestamp: "2026-03-15T10:01:23Z" }],
    },
  },
  {
    method: "GET",
    path: "/v1/athletes",
    summary: "List athletes",
    auth: "bearer",
    tags: ["Athletes"],
    responseExample: { data: [{ id: "ath_001", name: "Jane Smith", club: "National Range" }] },
  },
  {
    method: "GET",
    path: "/v1/competitions",
    summary: "List competitions",
    auth: "bearer",
    tags: ["Competitions"],
    responseExample: { data: [{ id: "comp_001", name: "National Championships 2026", status: "active" }] },
  },
];

export const webhookEvents = [
  { event: "shot.registered", description: "Fired when a new shot is detected and scored" },
  { event: "session.started", description: "Fired when a training or competition session begins" },
  { event: "session.completed", description: "Fired when a session ends" },
  { event: "competition.updated", description: "Fired when competition standings change" },
];

export const wsEndpoint = {
  path: "/ws/v1/scoring",
  description: "Real-time scoring feed. Subscribe to lane or session events.",
  exampleMessage: { type: "shot", data: { lane: 1, x: 0.42, y: -0.38, score: 10.2 } },
};
