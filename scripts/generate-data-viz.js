#!/usr/bin/env node
/**
 * generate-data-viz.js
 *
 * Creates branded data visualizations for LinkedIn posts.
 * Supports: bar, horizontalBar, doughnut, line charts
 *
 * Usage:
 *   node scripts/generate-data-viz.js --slug hvac-ai-tools --type bar
 *   node scripts/generate-data-viz.js --slug hvac-ai-tools --type doughnut
 */

const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const fs = require('fs');
const path = require('path');

// Brand colors
const brandColors = {
  orange: '#E8611A',
  orangeLight: 'rgba(232, 97, 26, 0.7)',
  orangeFaded: 'rgba(232, 97, 26, 0.3)',
  darkBg: '#2D2D2D',
  white: '#FFFFFF',
  gray: '#6B6B6B',
  green: '#28A745',
  greenLight: 'rgba(40, 167, 69, 0.7)'
};

// Chart dimensions (LinkedIn friendly)
const width = 1080;
const height = 1080;

const chartJSNodeCanvas = new ChartJSNodeCanvas({
  width,
  height,
  backgroundColour: brandColors.darkBg
});

/**
 * Generate a bar chart
 */
async function generateBarChart(config) {
  const { title, labels, datasets, outputPath } = config;

  const chartConfig = {
    type: 'bar',
    data: {
      labels,
      datasets: datasets.map((ds, i) => ({
        label: ds.label,
        data: ds.data,
        backgroundColor: i === 0 ? brandColors.orangeLight : brandColors.greenLight,
        borderColor: i === 0 ? brandColors.orange : brandColors.green,
        borderWidth: 2,
        borderRadius: 8
      }))
    },
    options: {
      responsive: false,
      plugins: {
        title: {
          display: true,
          text: title,
          color: brandColors.white,
          font: { size: 32, weight: 'bold', family: 'Arial' },
          padding: { top: 20, bottom: 30 }
        },
        legend: {
          display: datasets.length > 1,
          labels: { color: brandColors.white, font: { size: 16 } }
        }
      },
      scales: {
        x: {
          ticks: { color: brandColors.white, font: { size: 14 } },
          grid: { color: 'rgba(255,255,255,0.1)' }
        },
        y: {
          ticks: { color: brandColors.white, font: { size: 14 } },
          grid: { color: 'rgba(255,255,255,0.1)' }
        }
      }
    }
  };

  const buffer = await chartJSNodeCanvas.renderToBuffer(chartConfig);
  fs.writeFileSync(outputPath, buffer);
  console.log('✅ Bar chart created:', outputPath);
  return outputPath;
}

/**
 * Generate a horizontal bar chart
 */
async function generateHorizontalBarChart(config) {
  const { title, labels, datasets, outputPath } = config;

  const chartConfig = {
    type: 'bar',
    data: {
      labels,
      datasets: datasets.map((ds, i) => ({
        label: ds.label,
        data: ds.data,
        backgroundColor: i === 0 ? brandColors.orangeLight : brandColors.greenLight,
        borderColor: i === 0 ? brandColors.orange : brandColors.green,
        borderWidth: 2,
        borderRadius: 8
      }))
    },
    options: {
      indexAxis: 'y',
      responsive: false,
      plugins: {
        title: {
          display: true,
          text: title,
          color: brandColors.white,
          font: { size: 32, weight: 'bold', family: 'Arial' },
          padding: { top: 20, bottom: 30 }
        },
        legend: {
          display: datasets.length > 1,
          labels: { color: brandColors.white, font: { size: 16 } }
        }
      },
      scales: {
        x: {
          ticks: { color: brandColors.white, font: { size: 14 } },
          grid: { color: 'rgba(255,255,255,0.1)' }
        },
        y: {
          ticks: { color: brandColors.white, font: { size: 14 } },
          grid: { color: 'rgba(255,255,255,0.1)' }
        }
      }
    }
  };

  const buffer = await chartJSNodeCanvas.renderToBuffer(chartConfig);
  fs.writeFileSync(outputPath, buffer);
  console.log('✅ Horizontal bar chart created:', outputPath);
  return outputPath;
}

/**
 * Generate a doughnut chart
 */
async function generateDoughnutChart(config) {
  const { title, labels, data, outputPath } = config;

  // Generate colors based on count
  const colors = [
    brandColors.orange,
    brandColors.green,
    '#6366F1', // indigo
    '#8B5CF6', // purple
    '#EC4899'  // pink
  ];

  const chartConfig = {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: colors.slice(0, data.length),
        borderColor: brandColors.darkBg,
        borderWidth: 4
      }]
    },
    options: {
      responsive: false,
      plugins: {
        title: {
          display: true,
          text: title,
          color: brandColors.white,
          font: { size: 32, weight: 'bold', family: 'Arial' },
          padding: { top: 20, bottom: 30 }
        },
        legend: {
          position: 'bottom',
          labels: {
            color: brandColors.white,
            font: { size: 16 },
            padding: 20
          }
        }
      }
    }
  };

  const buffer = await chartJSNodeCanvas.renderToBuffer(chartConfig);
  fs.writeFileSync(outputPath, buffer);
  console.log('✅ Doughnut chart created:', outputPath);
  return outputPath;
}

/**
 * Generate an ROI comparison chart (specialized for boring business content)
 */
async function generateROIChart(config) {
  const { title, investment, returns, period, outputPath } = config;

  const chartConfig = {
    type: 'bar',
    data: {
      labels: ['Investment', 'Returns'],
      datasets: [{
        label: period || 'Monthly',
        data: [investment, returns],
        backgroundColor: [brandColors.orangeFaded, brandColors.greenLight],
        borderColor: [brandColors.orange, brandColors.green],
        borderWidth: 3,
        borderRadius: 12
      }]
    },
    options: {
      responsive: false,
      plugins: {
        title: {
          display: true,
          text: title,
          color: brandColors.white,
          font: { size: 32, weight: 'bold', family: 'Arial' },
          padding: { top: 20, bottom: 10 }
        },
        subtitle: {
          display: true,
          text: `ROI: ${Math.round((returns / investment - 1) * 100)}%`,
          color: brandColors.orange,
          font: { size: 24, weight: 'bold', family: 'Arial' },
          padding: { bottom: 30 }
        },
        legend: { display: false }
      },
      scales: {
        x: {
          ticks: { color: brandColors.white, font: { size: 18, weight: 'bold' } },
          grid: { display: false }
        },
        y: {
          ticks: {
            color: brandColors.white,
            font: { size: 14 },
            callback: (value) => '$' + value.toLocaleString()
          },
          grid: { color: 'rgba(255,255,255,0.1)' }
        }
      }
    }
  };

  const buffer = await chartJSNodeCanvas.renderToBuffer(chartConfig);
  fs.writeFileSync(outputPath, buffer);
  console.log('✅ ROI chart created:', outputPath);
  return outputPath;
}

/**
 * Extract chart data from post metadata
 */
function extractFromPost(postDir, chartType) {
  const metadataPath = path.join(postDir, 'metadata.json');

  if (!fs.existsSync(metadataPath)) {
    throw new Error(`metadata.json not found in ${postDir}`);
  }

  const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));

  // If metadata has data_viz field, use it
  if (metadata.data_viz) {
    return metadata.data_viz;
  }

  // Default ROI chart for boring business content
  if (chartType === 'roi') {
    return {
      title: 'ROI BREAKDOWN',
      investment: 200,
      returns: 2400,
      period: 'Monthly'
    };
  }

  // Default bar chart
  return {
    title: metadata.title || 'Data Visualization',
    labels: ['Tool 1', 'Tool 2', 'Tool 3', 'Tool 4', 'Tool 5'],
    datasets: [{
      label: 'Hours Saved/Week',
      data: [2, 4, 3, 2, 1]
    }]
  };
}

// CLI handling
async function main() {
  const args = process.argv.slice(2);
  const slugIndex = args.indexOf('--slug');
  const typeIndex = args.indexOf('--type');

  if (slugIndex === -1 || !args[slugIndex + 1]) {
    console.log('Usage: node scripts/generate-data-viz.js --slug <post-slug> [--type <chart-type>]');
    console.log('');
    console.log('Chart types:');
    console.log('  bar          Vertical bar chart');
    console.log('  horizontalBar  Horizontal bar chart');
    console.log('  doughnut     Doughnut/pie chart');
    console.log('  roi          ROI comparison (investment vs returns)');
    console.log('');
    console.log('Example:');
    console.log('  node scripts/generate-data-viz.js --slug hvac-ai-tools --type roi');
    process.exit(1);
  }

  const slug = args[slugIndex + 1];
  const chartType = typeIndex !== -1 ? args[typeIndex + 1] : 'bar';

  const contentLibrary = path.resolve(__dirname, '../content-library');

  // Find post directory
  const dirs = fs.readdirSync(contentLibrary);
  const postDirName = dirs.find(d => d.endsWith(`-${slug}`));

  if (!postDirName) {
    console.error(`❌ Post not found with slug: ${slug}`);
    process.exit(1);
  }

  const postDir = path.join(contentLibrary, postDirName);
  const picturesDir = path.resolve(__dirname, `../pictures-generated/${postDirName}`);

  fs.mkdirSync(picturesDir, { recursive: true });

  const config = extractFromPost(postDir, chartType);
  const outputFile = `data-viz-${chartType}.png`;
  config.outputPath = path.join(postDir, outputFile);

  // Generate based on type
  switch (chartType) {
    case 'bar':
      await generateBarChart(config);
      break;
    case 'horizontalBar':
      await generateHorizontalBarChart(config);
      break;
    case 'doughnut':
      await generateDoughnutChart(config);
      break;
    case 'roi':
      await generateROIChart(config);
      break;
    default:
      console.error(`❌ Unknown chart type: ${chartType}`);
      process.exit(1);
  }

  // Copy to pictures-generated
  const destPath = path.join(picturesDir, outputFile);
  fs.copyFileSync(config.outputPath, destPath);
  console.log('📁 Copied to:', destPath);
}

// Export for module use
module.exports = {
  generateBarChart,
  generateHorizontalBarChart,
  generateDoughnutChart,
  generateROIChart
};

if (require.main === module) {
  main().catch(console.error);
}
