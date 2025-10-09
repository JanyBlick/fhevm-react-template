const fs = require('fs');
const path = require('path');

/**
 * Export contract ABIs to a dedicated directory
 */
function exportAbis() {
  const artifactsPath = path.join(__dirname, '../artifacts/contracts');
  const abiOutputPath = path.join(__dirname, '../abi');

  // Create ABI output directory
  if (!fs.existsSync(abiOutputPath)) {
    fs.mkdirSync(abiOutputPath, { recursive: true });
  }

  // Find all contract artifacts
  function processDirectory(dirPath) {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        processDirectory(filePath);
      } else if (file.endsWith('.json') && !file.endsWith('.dbg.json')) {
        const artifact = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        if (artifact.abi && artifact.contractName) {
          const abiFile = path.join(abiOutputPath, `${artifact.contractName}.json`);
          fs.writeFileSync(abiFile, JSON.stringify(artifact.abi, null, 2));
          console.log(`Exported ABI for ${artifact.contractName}`);
        }
      }
    });
  }

  if (fs.existsSync(artifactsPath)) {
    processDirectory(artifactsPath);
    console.log('\nABI export complete!');
  } else {
    console.error('Artifacts directory not found. Run "npm run compile" first.');
    process.exit(1);
  }
}

exportAbis();
