(async () => {
  const list = document.getElementById("micstate-downloads");
  if (!list) return;

  try {
    const response = await fetch("https://api.github.com/repos/trypsynth/micstate/releases/latest");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const release = await response.json();
    const rows = ["x64", "arm64"].map(arch => {
      const name = `micstate-${arch}.exe`;
      const asset = release.assets?.find(asset => asset.name === name);
      if (!asset || !Number.isSafeInteger(asset.download_count) || asset.download_count < 0) {
        throw new Error(`Missing download: ${name}`);
      }
      const url = new URL(asset.browser_download_url);
      if (url.origin !== "https://github.com" || !url.pathname.startsWith("/trypsynth/micstate/releases/download/")) {
        throw new Error("Unexpected download URL");
      }
      const row = document.createElement("li");
      const link = document.createElement("a");
      link.href = url.href;
      link.textContent = `Download Micstate for Windows (${arch === "arm64" ? "ARM64" : "x64"})`;
      const count = asset.download_count;
      row.append(link, ` — downloaded ${count.toLocaleString()} ${count === 1 ? "time" : "times"}`);
      return row;
    });
    list.replaceChildren(...rows);
  } catch {
    for (const row of list.children) row.append(" — count unavailable");
  }
})();
