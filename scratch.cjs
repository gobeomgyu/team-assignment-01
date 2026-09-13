const fs = require('fs');
const path = 'c:\\Users\\LG\\.gemini\\antigravity-ide\\scratch\\team-assignment-01\\src\\style.css';
let css = fs.readFileSync(path, 'utf8');

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
