export interface ApiResponse<T = any> {
  data: T | null;
}

export interface ApiRequest {
  method: "GET" | "POST" | "PUT" | "DELETE";
  endpoint: string;
  body?: Record<string, any> | null;
}
