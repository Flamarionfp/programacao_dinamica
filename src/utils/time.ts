export function measureExecutionTime(fn: Function, ...args: any[]): number {
    const start = process.hrtime.bigint();
    fn(...args);
    const end = process.hrtime.bigint();
    return Number(end - start) / 1_000_000; 
}