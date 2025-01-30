import axios, { AxiosInstance, AxiosResponse } from "axios";

const BASE_URL = process.env.NODE_ENV === "production"
    ? "https://global-digital-af68.vercel.app/" // Replace with your production URL
    : "http://localhost:3000/";

// const BASE_URL = "http://localhost:3001"

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async get<T>(url: string, params?: any): Promise<T> {
    try {
      console.log("URL",url)
      const response: AxiosResponse<T> = await this.api.get(url, { params });
      // console.log("Data",response.data)
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  private handleError(error: any): void {
    console.error("API request failed:", error);
    // You can add more error handling logic here, such as showing notifications
  }
}

const apiService = new ApiService();
export default apiService;