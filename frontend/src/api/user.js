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

  refresh(refreshToken) {
    return request.get(this.getUri("/refresh"), {
      headers: {
        refresh: refreshToken,
      },
    });
  }
}

export const userAPI = new UserAPI();
