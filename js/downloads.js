(async () => {
  await Promise.all([...document.querySelectorAll("[data-download-repo]")].map(async list => {
    const repo = list.dataset.downloadRepo;
    if (!/^[a-z0-9-]+$/.test(repo)) return;
    try {
      const response = await fetch(`https://api.github.com/repos/trypsynth/${repo}/releases/latest`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const release = await response.json();
      for (const row of list.children) {
        const link = row.querySelector("a");
        if (!link) continue;
        const name = new URL(link.href).pathname.split("/").pop();
        const asset = release.assets?.find(asset => asset.name === name);
        if (!asset || !Number.isSafeInteger(asset.download_count) || asset.download_count < 0) {
          row.append(" — count unavailable");
          continue;
        }
        const count = asset.download_count;
        row.append(` — downloaded ${count.toLocaleString()} ${count === 1 ? "time" : "times"}`);
      }
    } catch {
      for (const row of list.children) row.append(" — count unavailable");
    }
  }));
})();
