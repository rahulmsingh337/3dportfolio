import { ArrowUpRight } from "lucide-react";
import { INDEX_ITEMS, SCENES, type SceneId } from "@/lib/data/projects";
import MaskText from "@/components/ui/MaskText";
import WorkScene from "./WorkScene";
import WorkHeaderFx from "./WorkHeaderFx";
import { ArchVisual, CostVisual, EamVisual, PrintVisual, PromptVisual } from "@/components/visuals/SceneVisuals";

const VISUALS: Record<SceneId, () => React.JSX.Element> = { eam: EamVisual, massprint: PrintVisual, lt03: CostVisual, rap: ArchVisual, prompify: PromptVisual };

export default function Work() {
  return (
    <section id="work" className="work" data-section="Work" data-num="04">
      <header className="wrap work-head">
        <p className="eyebrow">Selected work</p>
        <MaskText as="h2" className="display work-h" text="Work that" em="shipped" />
        <p className="lede">Built inside live S/4HANA programmes, plus a few things I made on my own time because they needed to exist.</p>
        <WorkHeaderFx />
      </header>

      {SCENES.map((s, i) => {
        const Visual = VISUALS[s.id];
        return <WorkScene key={s.id} scene={s} flip={i % 2 === 1}><Visual /></WorkScene>;
      })}

      <div className="wrap ix">
        <h3 className="ix-h mono">Also shipped</h3>
        <ul className="ix-list">
          {INDEX_ITEMS.map((it) => {
            const body = (
              <>
                <span className="ix-tag tag">{it.tag}</span>
                <span className="ix-t">{it.title}</span>
                <span className="ix-b">{it.blurb}</span>
                <span className="ix-o">{it.outcome}</span>
                {it.href && <ArrowUpRight className="ix-a" size={20} strokeWidth={1.5} />}
              </>
            );
            return <li key={it.id}>{it.href ? <a className="ix-item glass" href={it.href} target="_blank" rel="noreferrer">{body}</a> : <div className="ix-item glass">{body}</div>}</li>;
          })}
        </ul>
      </div>
    </section>
  );
}
