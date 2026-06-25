// Shared by the page and the worker, so no DOM access here.

var DEFAULT_ITERATIONS = 30;

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
  // Time each query separately and keep the raw values in order, so downstream
  // can separate the first query from the rest and still see run-to-run variance.
  var values = [];
  for (var i = 0; i < iterations; i++) {
    var start = performance.now();
    await runQuery(testcase);
    values.push(performance.now() - start);
  }
  return { name: testcase.name, values };
}

async function runAll(filter, options) {
  options = options || {};
  var selected = testcases.filter(function (testcase) {
    return !filter || filter(testcase);
  });

  var results = [];

  // The first MediaCapabilities query in a process pays a one-time, process-wide
  // init that is independent of the codec and of decode vs encode. Run it once up
  // front so it is not charged to whichever testcase runs first. Only the main
  // thread reports it: the worker always runs after the page here, so by then the
  // process is already warm and a worker number would not reflect that cold cost.
  if (selected.length) {
    var firstStart = performance.now();
    await runQuery(selected[0]);
    if (options.recordFirstQuery) {
      results.push({
        name: "first-query",
        values: [performance.now() - firstStart],
      });
    }
  }

  for (var i = 0; i < selected.length; i++) {
    results.push(await runOne(selected[i]));
  }
  return results;
}
