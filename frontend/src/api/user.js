import { API, request } from "./instance";

class UserAPI extends API {
  constructor() {
    super("/user");
  }

  login({ email, password }) {
    return request.post(this.getUri("/login"), {
      email,
      password,
    });
  }

  refresh() {
    return request.get(this.getUri("/refresh"));
  }
}

export const userAPI = new UserAPI();
