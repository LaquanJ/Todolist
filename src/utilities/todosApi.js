// common modules
import axios from 'axios';

// =============================================================================
// API client
// =============================================================================
const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE,
  timeout: 30000,
  headers: {
    'Accept': 'application/json',
  }
});

// add authorization header interceptor
client.interceptors.request.use(async (config) => {
  // add token to header
  config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvaWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJzY3AiOiJUb2Rvcy5SZWFkIiwicm9sZXMiOlsiQWRtaW5pc3RyYXRvciJdLCJhenAiOiJhMDdlMDNmMy0yNDY2LTRlOGYtOWRiZC0xYzRkYzdhMjljYmIiLCJuYW1lIjoiQ0xBLCBEZXZlbG9wZXIiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJjbGEuZGV2ZWxvcGVyQGludmFsaWQuY29tIn0.pkQ1jIP-kIcYddrRmJAtxS4_wir3JkYofvl-lNCT_iI`;

  return config;
}, null);

export default client;