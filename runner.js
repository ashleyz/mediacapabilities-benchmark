// Shared by the page and the worker, so no DOM access here.

var DEFAULT_ITERATIONS = 200;

var testcases = [];

function registerTestCase(testcase) {
  testcases.push(testcase);
}

function runQuery(testcase) {
  var mc = navigator.mediaCapabilities;
  if (testcase.kind === "encode") {
    return mc.encodingInfo(testcase.config);
  }
  return mc.decodingInfo(testcase.config);
}

async function runOne(testcase) {
  var iterations = testcase.iterations || DEFAULT_ITERATIONS;
  await runQuery(testcase); // warm up
  // A single query is below timer resolution, so time a batch.
  var start = performance.now();
  for (var i = 0; i < iterations; i++) {
    await runQuery(testcase);
  }
  var end = performance.now();
  return { name: testcase.name, duration: (end - start) / iterations };
}

async function runAll(filter) {
  var results = [];
  for (var i = 0; i < testcases.length; i++) {
    var testcase = testcases[i];
    if (filter && !filter(testcase)) {
      continue;
    }
    results.push(await runOne(testcase));
  }
  return results;
}
