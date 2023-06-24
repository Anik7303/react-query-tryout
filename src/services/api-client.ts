import axios, { AxiosRequestConfig } from "axios";

const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export default class APIClient<T> {
  constructor(public endpoint: string) {}

  get = (config?: AxiosRequestConfig): Promise<T[]> =>
    instance.get<T[]>(this.endpoint, config).then((res) => res.data);

  post = (data: T, config?: AxiosRequestConfig): Promise<T> =>
    instance.post<T>(this.endpoint, data, config).then((res) => res.data);
}
