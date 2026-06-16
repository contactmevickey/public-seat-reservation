import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  sub: number;
  email: string;
  exp: number;
  iat: number;
}

export const getCurrentUserId = (): number | null => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return null;
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    return decoded.sub;
  } catch {
    return null;
  }
};
