
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const teamsFilePath = path.join(__dirname, 'app', 'data', 'teams.ts');

// Read the file
fs.readFile(teamsFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // Extract the array of teams
  const match = data.match(/export const teams = \[([\s\S]*?)\];/);
  if (!match) {
    console.error('Could not find teams array in file');
    return;
  }

  // Split the array into individual team names
  let teams = match[1].split(',').map(team => team.trim().replace(/^"|"$/g, ''));

  // Sort the teams alphabetically
  teams.sort((a, b) => a.localeCompare(b));

  // Reconstruct the file content
  const newContent = `export const teams = [\n  "${teams.join('",\n  "')}"\n];\n`;

  // Write the sorted teams back to the file
  fs.writeFile(teamsFilePath, newContent, 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
    } else {
      console.log('Teams have been alphabetized successfully!');
    }
  });
});