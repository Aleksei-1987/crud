export type FetchProps<T extends RequestInit | undefined> = {
    url: string;
    options?: T;
};