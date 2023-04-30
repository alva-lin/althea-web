import axios from "axios";


/** 心跳检测 GET /api/Health/HeartBeat */
export async function getHealth() {
  return axios.request<null>({
    method: "GET",
    url: "/health/heartbeat",
  });
}
