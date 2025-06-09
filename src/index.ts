import { runBenchmarks } from './benchmark';
import { saveResultsToCsv, saveChart } from './exporters';

async function main() {
    try {
        console.log('Executando testes...');
        const results = runBenchmarks();

        console.log('Salvando resultados em CSV...');
        await saveResultsToCsv(results, 'fibonacci_results.csv');

        console.log('Gerando gráfico...');
        await saveChart(results, 'fibonacci_comparison.png');

        console.log('FIM!');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

main(); 