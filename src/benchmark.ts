import { recursiveFibonacci, memoizedFibonacci, bottomUpFibonacci } from './fibonacci';
import { measureExecutionTime } from './utils/time';

export interface BenchmarkResult {
    n: number;
    recursive: number;
    memoized: number;
    bottomUp: number;
}


export function runBenchmarks(maxN: number = 40): BenchmarkResult[] {
    const results: BenchmarkResult[] = [];

    for (let n = 0; n <= maxN; n++) {
        const recursiveTime = measureExecutionTime(recursiveFibonacci, n);
        const memoizedTime = measureExecutionTime(memoizedFibonacci, n, new Map());
        const bottomUpTime = measureExecutionTime(bottomUpFibonacci, n);

        results.push({
            n,
            recursive: recursiveTime,
            memoized: memoizedTime,
            bottomUp: bottomUpTime
        });
    }

    return results;
} 