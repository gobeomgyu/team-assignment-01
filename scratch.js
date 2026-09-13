const fs = require('fs');
const path = 'c:\\Users\\LG\\.gemini\\antigravity-ide\\scratch\\team-assignment-01\\src\\style.css';
let css = fs.readFileSync(path, 'utf8');

// Replace font-size: Xpx;
css = css.replace(/font-size:\s*(\d+)px/g, (match, p1) => {
  const size = parseInt(p1, 10);
  if (size < 30) {
    return `font-size: ${size + 1}px`;
  }
  return match;
});

// Also need to check clamp() font sizes if any, e.g., font-size: clamp(Xpx, Y, Zpx);
// Let's do a more generic replace of any px value in a font-size declaration
css = css.replace(/font-size:\s*([^;]+);/g, (match, value) => {
    let newValue = value.replace(/(\d+)px/g, (match2, p1) => {
        const size = parseInt(p1, 10);
        if (size < 30) {
            return `${size + 1}px`;
        }
        return match2;
    });
    return `font-size: ${newValue};`;
});

fs.writeFileSync(path, css, 'utf8');
console.log('Done');
