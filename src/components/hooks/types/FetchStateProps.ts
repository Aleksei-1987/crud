export type FetchStatusProps = {
  isLoading: boolean;
  data?: Array<{id: number; content: string; createdAt: number}>;
  error: string | null;
}