import { api } from "./api";

export async function callAI(
  endpoint: string,
  text: string
) {
  const { data } = await api.post(
    `/ai/${endpoint}`,
    {
      text,
    }
  );

  return data;
}