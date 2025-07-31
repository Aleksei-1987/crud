export type FetchStatusProps = {
  isLoading: boolean;
  data?: Array<{content: string; createdAt: number; id: number}>;
  error: string | null;
}