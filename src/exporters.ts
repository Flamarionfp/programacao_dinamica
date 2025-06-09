import { createObjectCsvWriter } from 'csv-writer';
import { ChartJSNodeCanvas } from 'chartjs-node-canvas';
import * as fs from 'fs';
import { BenchmarkResult } from './benchmark';

export async function saveResultsToCsv(results: BenchmarkResult[], filename: string): Promise<void> {
    const csvWriter = createObjectCsvWriter({
        path: filename,
        header: [
            { id: 'n', title: 'N' },
            { id: 'recursive', title: 'Recursive (ms)' },
            { id: 'memoized', title: 'Memoized (ms)' },
            { id: 'bottomUp', title: 'Bottom-up (ms)' }
        ]
    });

    await csvWriter.writeRecords(results);
}

export async function saveChart(results: BenchmarkResult[], filename: string): Promise<void> {
    const width = 800;
    const height = 600;
    const chartCallback = (ChartJS: any) => {
        ChartJS.defaults.responsive = false;
        ChartJS.defaults.maintainAspectRatio = false;
    };

    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, chartCallback });

    const data = {
        labels: results.map(r => r.n.toString()),
        datasets: [
            {
                label: 'Recursive',
                data: results.map(r => r.recursive),
                borderColor: 'rgb(255, 99, 132)',
                fill: false
            },
            {
                label: 'Memoized',
                data: results.map(r => r.memoized),
                borderColor: 'rgb(54, 162, 235)',
                fill: false
            },
            {
                label: 'Bottom-up',
                data: results.map(r => r.bottomUp),
                borderColor: 'rgb(75, 192, 192)',
                fill: false
            }
        ]
    };

    const configuration = {
        type: 'line',
        data: data,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Fibonacci Implementation Comparison'
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Time (ms)'
                    },
                    type: 'logarithmic'
                },
                x: {
                    title: {
                        display: true,
                        text: 'n'
                    }
                }
            }
        }
    };

    const image = await chartJSNodeCanvas.renderToBuffer(configuration as any);
    fs.writeFileSync(filename, image);
} 