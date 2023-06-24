import axios from "axios";

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (): Promise<T[]> => {
    return instance.get<T[]>(this.endpoint).then((res) => res.data);
  };

  post = (data: T): Promise<T> => {
    return instance.post<T>(this.endpoint, data).then((res) => res.data);
  };
}

export default APIClient;
