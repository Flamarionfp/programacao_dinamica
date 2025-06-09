export function recursiveFibonacci(n: number): number {
    if (n <= 1) return n;
    
    return recursiveFibonacci(n - 1) + recursiveFibonacci(n - 2);
}


export function memoizedFibonacci(n: number, memo: Map<number, number> = new Map()): number {
    if (n <= 1) return n;
    if (memo.has(n)) return memo.get(n)!;
    
    const result = memoizedFibonacci(n - 1, memo) + memoizedFibonacci(n - 2, memo);
    memo.set(n, result);

    return result;
}

export function bottomUpFibonacci(n: number): number {
    if (n <= 1) return n;
    
    let prev = 0;
    let current = 1;
    
    for (let i = 2; i <= n; i++) {
        const next = prev + current;
        prev = current;
        current = next;
    }
    
    return current;
} 