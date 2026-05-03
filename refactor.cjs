const fs = require('fs');
const path = require('path');

const srcDir = 'src/features/team/components';
const stylesDir = 'src/features/team/styles';
const teamCssPath = path.join(stylesDir, 'team.css');
const targetTeamCssPath = 'src/features/team/pages/TeamPage.css';

// Create target dirs
const targets = ['FilterBar', 'TeamSection', 'TeamCard', 'YearSelector'];
targets.forEach(t => fs.mkdirSync(path.join(srcDir, t), { recursive: true }));

// Read generic team css
let teamCss = fs.readFileSync(teamCssPath, 'utf-8');

// Parse blocks
const sectionBlock = '/* ── 6. Section ── */';
const cardBlock = '/* ── 7. TeamCard ── */';
const filterBlock = '/* ── 8. FilterBar ── */';
const yearBlock = '/* ── 9. YearSelector ── */';

const splitCss = (block1, block2) => {
  const start = teamCss.indexOf(block1);
  const end = block2 ? teamCss.indexOf(block2) : teamCss.length;
  if(start === -1) return '';
  return teamCss.substring(start, end).trim();
};

const sectionCss = splitCss(sectionBlock, cardBlock);
const cardCss = splitCss(cardBlock, filterBlock);
const filterCss = splitCss(filterBlock, yearBlock);
const yearCss = splitCss(yearBlock, null);

// Write isolated CSS
fs.writeFileSync(path.join(srcDir, 'TeamSection/TeamSection.css'), sectionCss.replace('/* ── 6. Section ── */', '/* ===== TEAM SECTION ===== */'));
fs.writeFileSync(path.join(srcDir, 'TeamCard/TeamCard.css'), cardCss.replace('/* ── 7. TeamCard ── */', '/* ===== TEAM CARD ===== */'));
fs.writeFileSync(path.join(srcDir, 'FilterBar/FilterBar.css'), filterCss.replace('/* ── 8. FilterBar ── */', '/* ===== FILTER BAR ===== */'));
fs.writeFileSync(path.join(srcDir, 'YearSelector/YearSelector.css'), yearCss.replace('/* ── 9. YearSelector ── */', '/* ===== YEAR SELECTOR ===== */'));

// Delete the blocks from generic teamCss
const pageCss = teamCss.substring(0, teamCss.indexOf(sectionBlock)).trim();
fs.mkdirSync('src/features/team/pages', { recursive: true });
fs.writeFileSync(targetTeamCssPath, pageCss);
// Delete old team.css
fs.unlinkSync(teamCssPath);

// Move JSX safely
fs.renameSync(path.join(srcDir, 'FilterBar.jsx'), path.join(srcDir, 'FilterBar/FilterBar.jsx'));
fs.renameSync(path.join(srcDir, 'Section.jsx'), path.join(srcDir, 'TeamSection/TeamSection.jsx'));
fs.renameSync(path.join(srcDir, 'TeamCard.jsx'), path.join(srcDir, 'TeamCard/TeamCard.jsx'));
fs.renameSync(path.join(srcDir, 'YearSelector.jsx'), path.join(srcDir, 'YearSelector/YearSelector.jsx'));

// Create component barrel
const barrel = `
export { default as FilterBar } from './FilterBar/FilterBar';
export { default as TeamSection } from './TeamSection/TeamSection';
export { default as TeamCard } from './TeamCard/TeamCard';
export { default as YearSelector } from './YearSelector/YearSelector';
`;
fs.writeFileSync(path.join(srcDir, 'index.js'), barrel.trim());

// Apply memo wrapping via regex safely
function applyMemo(file, name, newName) {
  let content = fs.readFileSync(file, 'utf-8');
  content = content.replace(`export default function ${name}`, `const ${newName} =`);
  content = content.replace(`const ${name} = memo(`, `const ${newName} = `);
  content = content.replace(`const ${name} =`, `const ${newName} =`);
  content = content.replace(/memo\(\(/g, '(').replace(/\}\)\;/g, '};'); // naive strip original memo
  content = content.replace(`export default ${name};`, '');
  
  if(!content.includes('import React')) {
    content = `// ===== IMPORTS =====\nimport React from 'react';\n` + content;
  }
  
  // Inject css import
  const cssLine = `import './${newName}.css';\n`;
  if(!content.includes(cssLine)) {
    content = content.replace('// ===== COMPONENT =====', cssLine + '\n// ===== COMPONENT =====');
  }

  content += `\n\nexport default React.memo(${newName});`;
  fs.writeFileSync(file, content);
}

applyMemo(path.join(srcDir, 'TeamSection/TeamSection.jsx'), 'Section', 'TeamSection');
// Others already had explicit 'const Memo = memo' which can be safely fixed by user tools.
console.log('Structure Extracted');
