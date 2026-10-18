// Server entry used ONLY at build time to prerender pages to static HTML
// (so search engines and AI crawlers see the full content without running JS).
import { Writable } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { AppRoutes } from "./App";

export function render(url: string): Promise<{ html: string; head: string; htmlAttrs: string }> {
  return new Promise((resolve, reject) => {
    const helmetContext: any = {};
    let html = "";
    const sink = new Writable({
      write(chunk, _enc, cb) {
        html += chunk.toString();
        cb();
      },
      final(cb) {
        const h = helmetContext.helmet;
        const head = h
          ? [h.title, h.meta, h.link, h.script].map((x: any) => x?.toString() ?? "").join("\n    ")
          : "";
        const htmlAttrs = h?.htmlAttributes?.toString() ?? "";
        resolve({ html, head, htmlAttrs });
        cb();
      },
    });

    const stream = renderToPipeableStream(
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </HelmetProvider>,
      {
        onAllReady() {
          stream.pipe(sink);
        },
        onShellError: reject,
        onError(err) {
          reject(err);
        },
      },
    );
    setTimeout(() => reject(new Error("render timeout")), 15000);
  });
}
