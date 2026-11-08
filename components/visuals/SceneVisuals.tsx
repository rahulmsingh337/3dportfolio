import { Check } from "lucide-react";
import { vars } from "@/lib/utils";

/**
 * Presentational "product shots" for the work scenes. Pure markup: every motion is CSS driven by `--p`
 * (0 → 1 scene progress, set once per scene by GSAP), so there is no per-frame JavaScript here.
 */

const Chrome = ({ title }: { title: string }) => (
  <div className="v-bar"><i className="v-dot" /><i className="v-dot" /><i className="v-dot" /><span>{title}</span></div>
);

export function EamVisual() {
  const bars: Array<[number, number]> = [[4, 46], [14, 38], [26, 52], [8, 30], [34, 40], [18, 44]];
  return (
    <div className="v v-eam" role="img" aria-label="Illustration of a maintenance order scheduling board with two Fiori app tiles, F2173 and F2175">
      <div className="v-win">
        <Chrome title="Schedule Maintenance Orders & Operations" />
        <div className="eam-body">
          <div className="eam-tiles">
            <div className="eam-tile"><b>F2173</b><small>Manage Maintenance Orders</small></div>
            <div className="eam-tile on"><b>F2175</b><small>Schedule Orders & Operations</small></div>
          </div>
          <div className="eam-rows">
            {bars.map(([s, w], i) => (
              <div className="eam-row" key={i}><span className="eam-tag" /><div className="eam-lane"><i className="eam-bar" style={vars({ "--s": s, "--w": w, "--k": i })} /></div></div>
            ))}
            <i className="eam-now" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PrintVisual() {
  const sheets: Array<[number, number, number]> = [[-15, -3, -17], [-9, 1, -10], [-4, 2, -4], [4, 2, 4], [10, 1, 10], [16, -3, 17]];
  return (
    <div className="v v-print" role="img" aria-label="Illustration of a stack of maintenance order documents fanning out for batch printing">
      <div className="pr-stack">
        {sheets.map(([x, y, r], i) => <i className="pr-sheet" key={i} style={vars({ "--x": x, "--y": y, "--r": r })} />)}
        <div className="pr-sheet pr-top" style={vars({ "--x": 0, "--y": 0, "--r": 0 })}>
          <span className="pr-h" /><span className="pr-l w1" /><span className="pr-l w2" /><span className="pr-l w3" /><span className="pr-l w2" /><span className="pr-l w1" />
        </div>
      </div>
      <div className="pr-btn"><Check size={16} strokeWidth={2.2} /> Print all selected</div>
    </div>
  );
}

export function CostVisual() {
  return (
    <div className="v v-cost" role="img" aria-label="Illustration: a third-party tool costing more than 50 thousand euros crossed out, replaced by a custom ABAP transaction">
      <div className="co-big grad">€50K+</div>
      <div className="co-row">
        <div className="co-card co-old"><small>Third-party tool</small><b>€50K+</b><i className="co-strike" /></div>
        <div className="co-card co-new">
          <small>Custom ABAP transaction</small>
          {["Delivered on time", "Zero post-go-live defects", "Client appreciation letter"].map((t, i) => (
            <span className="co-check" key={t} style={vars({ "--t": 0.3 + i * 0.14 })}><Check size={14} strokeWidth={2.4} /> {t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ArchVisual() {
  const layers = ["Business Object", "CDS View Entity", "OData V4 Service", "Fiori Elements UI"];
  return (
    <div className="v v-arch" role="img" aria-label="Exploded diagram of a RAP application: business object, CDS view entity, OData V4 service and Fiori Elements UI">
      <div className="ar-stage"><div className="ar-stack">{layers.map((l, i) => <i className="ar-layer" key={l} style={vars({ "--i": i })} />)}</div></div>
      <ul className="ar-labels">
        {[...layers].reverse().map((l, i) => <li key={l} style={vars({ "--t": 0.2 + i * 0.12 })}><span>{String(layers.length - i).padStart(2, "0")}</span>{l}</li>)}
      </ul>
    </div>
  );
}

export function PromptVisual() {
  return (
    <div className="v v-prompt" role="img" aria-label="Illustration: a rough idea being turned into a structured AI prompt by Prompify using the Gemini API">
      <div className="pm-pane pm-in"><small>Rough idea</small><p>make a prompt to summarise customer feedback</p></div>
      <div className="pm-arrow"><i /><span>Gemini API</span></div>
      <div className="pm-pane pm-out">
        <small>Structured prompt</small>
        {[["Role", "Senior CX analyst"], ["Task", "Summarise the feedback"], ["Context", "Quarterly survey data"], ["Format", "Themes + actions"]].map(([k, v], i) => (
          <p key={k} style={vars({ "--t": 0.18 + i * 0.16 })}><b>{k}</b>{v}</p>
        ))}
      </div>
    </div>
  );
}
