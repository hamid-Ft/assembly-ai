/// <reference types="vite/client" />

interface ImportMetaEnv {
    [key: string]: string;
    VITE_API_KEY?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
