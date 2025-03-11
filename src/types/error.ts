import axios, { isAxiosError } from "axios";

type ErrorResonse = {
  code: number;
  message?: string;
}

export function parseErrorAxios(error: unknown) {
  if (isAxiosError(error)) {
    return error.response?.data as ErrorResonse;
  }
}