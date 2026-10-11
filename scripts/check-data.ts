import { getProductById, getProducts, searchProducts } from '../src/data/productApi';

function expect(condition: boolean, message: string) {
  if (!condition) throw new Error(message);
}

const checks: [string, () => Promise<void>][] = [
  ['getProducts(3, 0) returns 3 products and a total', async () => {
    const r = await getProducts(3, 0);
    expect(r.products.length === 3, `expected 3 products, got ${r.products.length}`);
    expect(r.total > 3, `expected total > 3, got ${r.total}`);
    expect(r.skip === 0, `expected skip 0, got ${r.skip}`);
  }],
  ['getProducts(3, 3) really skips (first id should be 4)', async () => {
    const r = await getProducts(3, 3);
    expect(r.products[0].id === 4, `expected first id 4, got ${r.products[0].id}`);
  }],
  ['getProductById(1) returns a full product', async () => {
    const p = await getProductById(1);
    expect(p.id === 1, `expected id 1, got ${p.id}`);
    expect(typeof p.title === 'string' && p.title.length > 0, 'title missing');
    expect(typeof p.price === 'number', 'price should be a number');
    expect(Array.isArray(p.images), 'images should be an array');
  }],
  ['getProductById(99999) THROWS (404 must become an error)', async () => {
    let message = '';
    try {
      await getProductById(99999);
    } catch (e) {
      message = (e as Error).message;
    }
    expect(message !== '', 'no error thrown. Did you check response.ok in client.ts?');
    expect(message.includes('404'), `error message should include the status code 404, got: "${message}"`);
    console.log('      error message was:', message);
  }],
  ['searchProducts("phone") finds products', async () => {
    const r = await searchProducts('phone', 5, 0);
    expect(r.products.length > 0, 'expected some results for "phone"');
  }],
  ['searchProducts("zzzzqq") returns an EMPTY list, not an error', async () => {
    const r = await searchProducts('zzzzqq', 5, 0);
    expect(r.products.length === 0, 'expected 0 results');
  }],
  ['searchProducts("red phone") handles a space (encodeURIComponent)', async () => {
    await searchProducts('red phone', 5, 0);
  }],
];

async function main() {
  let failed = 0;
  for (const [name, run] of checks) {
    try {
      await run();
      console.log(`PASS  ${name}`);
    } catch (e) {
      failed++;
      console.log(`FAIL  ${name}\n      ${(e as Error).message}`);
    }
  }
  console.log(failed === 0 ? '\nAll checks passed. Phase 1 works.' : `\n${failed} check(s) failed.`);
  process.exit(failed === 0 ? 0 : 1);
}

main();
