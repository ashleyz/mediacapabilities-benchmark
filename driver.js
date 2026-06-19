function runInWorker() {
  return new Promise((resolve, reject) => {
    var worker = new Worker("media-capabilities-worker.js");
    worker.onmessage = e => {
      worker.terminate();
      if (e.data.ok) {
        resolve(e.data.results);
      } else {
        reject(new Error("worker error: " + e.data.message));
      }
    };
    worker.onerror = e => {
      worker.terminate();
      reject(new Error("worker error: " + e.message));
    };
    worker.postMessage("run");
  });
}

async function runBenchmark() {
  var results = await runAll();
  var workerResults = await runInWorker();
  for (var i = 0; i < workerResults.length; i++) {
    var wr = workerResults[i];
    results.push({ name: "worker-" + wr.name, duration: wr.duration });
  }
  report(results);
}

function report(results) {
  document.getElementById("in-progress").style.display = "none";
  var str = "<table><thead><tr><td>Subtest</td><td>Per-query time (ms)</td>" +
            "</tr></thead>";
  for (var i = 0; i < results.length; i++) {
    var r = results[i];
    str += "<tr><td>" + r.name + "</td><td>" + r.duration.toFixed(3) +
           "</td></tr>";
  }
  str += "</table>";
  document.getElementById("results").innerHTML = str;
  document.getElementById("run-all").disabled = false;

  if (location.search.includes("raptor")) {
    var data = ["raptor-benchmark", "media-capabilities", JSON.stringify(results)];
    window.postMessage(data, "*");
    window.sessionStorage.setItem("benchmark_results", JSON.stringify(data));
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("run-all").addEventListener("click", function () {
    document.getElementById("run-all").disabled = true;
    document.getElementById("in-progress").style.display = "inline";
    runBenchmark();
  });
  // auto-run when running in raptor
  if (location.search.includes("raptor")) {
    document.getElementById("run-all").disabled = true;
    document.getElementById("in-progress").style.display = "inline";
    setTimeout(runBenchmark, 100);
  }
});
