import fs from 'fs';
import path from 'path';
import {transform} from '@svgr/core';
import svgo from '@svgr/plugin-svgo';
import jsx from '@svgr/plugin-jsx';
import prettierPlugin from '@svgr/plugin-prettier';

const RAW_SVG_DIR = path.resolve(__dirname, '../assets/svg_raw');
import type { Config } from '@svgr/core';
const OUT_SVG_DIR = path.resolve(__dirname, '../assets/svg');

function toPascalCase(name: string): string {
  return name
    .replace(/\.svg$/, '')
    .split(/[_-]/)
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
}

const svgFiles = fs.readdirSync(RAW_SVG_DIR).filter(f => f.endsWith('.svg'));

async function convertOne(file: string) {
  const filePath = path.join(RAW_SVG_DIR, file);
  const svgCode = fs.readFileSync(filePath, 'utf8');
  const componentName = toPascalCase(file);
  const outputPath = path.join(OUT_SVG_DIR, `${componentName}.tsx`);

  try {
    const svgrConfig: Config = {
      typescript: true,
      native: true,
      icon: true,
      expandProps: 'end',
      prettier: true,
      plugins: [svgo, jsx, prettierPlugin],
      svgoConfig: {
        plugins: [
          {name: 'removeXMLNS'},
          // Remove xmlns:xlink & friends at the SVG stage
          {name: 'removeAttrs', params: { attrs: ['xmlns:xlink', 'xmlnsXlink'] }},
        ],
      },
    };

    let tsxCode = await transform(svgCode, svgrConfig, {componentName});

    // Patch fill & stroke attributes: support both fill/stroke="#fff" and fill/stroke={'#fff'}; keep value when it's 'none'
    tsxCode = tsxCode
      // fill="#fff"
      .replace(/fill=(["'])(?!none)(#[0-9a-fA-F]{3,8}|[a-zA-Z]+)\1/g, (_m, _q, value) => `fill={props.fill ?? '${value}'} `)
      // fill={'#fff'}
      .replace(/fill=\{(["'])(#[0-9a-fA-F]{3,8}|[a-zA-Z]+)\1\}/g, (_m, _q, value) => `fill={props.fill ?? '${value}'} `)
      // stroke="#fff"
      .replace(/stroke=(["'])(?!none)(#[0-9a-fA-F]{3,8}|[a-zA-Z]+)\1/g, (_m, _q, value) => `stroke={props.fill ?? '${value}'} `)
      // stroke={'#fff'}
      .replace(/stroke=\{(["'])(#[0-9a-fA-F]{3,8}|[a-zA-Z]+)\1\}/g, (_m, _q, value) => `stroke={props.fill ?? '${value}'} `)
      // Fallback: strip any leftover xmlnsXlink in TSX
      .replace(/\s+xmlnsXlink=\{.*?\}/g, '')
      .replace(/\s+xmlnsXlink=("|').*?\1/g, '');

    // Normalize any existing fillOpacity to 1
    tsxCode = tsxCode
      .replace(/\sfillOpacity=\{[^}]*\}/g, ' fillOpacity={1}')
      .replace(/\sfillOpacity=("[^"]*"|'[^']*')/g, ' fillOpacity={1}');

    // Inject default fillOpacity=1 when element has fill/stroke but no fillOpacity
    tsxCode = tsxCode.replace(/<([A-Za-z]+)([^>]*)\/>/g, (match, tag: string, attrs: string) => {
      if ((/\bfill=/.test(attrs) || /\bstroke=/.test(attrs)) && !/\bfillOpacity=/.test(attrs)) {
        return `<${tag}${attrs} fillOpacity={1}/>`;
      }
      return match;
    });

    fs.writeFileSync(outputPath, tsxCode, 'utf8');
    console.log(`✅ ${file} → ${componentName}.tsx`);
  } catch (err) {
    console.error(`❌ Failed to convert ${file}:`, err);
  }
}

async function run() {
  for (const file of svgFiles) {
    // eslint-disable-next-line no-await-in-loop
    await convertOne(file);
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
