import {CreateLogEntry} from "./components/ReRenderListener";

export interface UseProfilerJson {
    name: string
    logEntries: UseProfilerEntry[]
}

export interface CreateLogJson {
    name: string
    logEntries: CreateLogEntry[]
}

interface CreateLogEntry {
    parentComponent: string;
    renderCount: number
}

interface UseProfilerEntry {
    id: string;
    phase: "mount" | "update" | "nested-update";
    actualDuration: number;
    baseDuration: number;
    startTime: number;
    commitTime: number
}