import { Mail, Phone, ArrowUpRight } from "lucide-react";
import { IconLinkedIn, IconGitHub, IconPrompify } from "./Icons";
import ScrubIn from "./ScrubIn";
import { playLinkSound } from "../utils/linkSound";

export default function Contact() {
  return (
    <section id="contact" className="wrap contact">
      <div className="eyebrow" style={{ justifyContent: "center" }}>
        <span>06</span><span className="rule" /><span>Contact</span>
      </div>
      <ScrubIn as="div" from={{ y: 70, scale: 0.9, opacity: 0.65 }} range={["start 100%", "start 45%"]}>
      <h2 className="display">
        <span className="sr-only">Contact Rahul Singh, SAP ABAP Lead: </span>
        Ready to give your SAP landscape a <em>second act?</em>
      </h2>
      </ScrubIn>
      <ScrubIn as="div" from={{ y: 30, opacity: 0.65 }} range={["start 100%", "start 60%"]}>
      <p className="lede">
        Planning an S/4HANA move, wrestling with years of custom code, or building on ABAP Cloud? I’d like to hear about it. Based in Noida, India, working with global teams.
      </p>
      </ScrubIn>
      <ScrubIn as="div" from={{ y: 30, opacity: 0.65 }} range={["start 100%", "start 70%"]}>
      <div className="contact-links">
        <a onMouseEnter={playLinkSound} onClick={playLinkSound} className="btn btn-primary" href="mailto:rs58598@gmail.com"><Mail size={16} /> Email me</a>
        <a onMouseEnter={playLinkSound} onClick={playLinkSound} className="btn btn-ghost" href="https://www.linkedin.com/in/rahul-singh-sap-abap/" target="_blank" rel="noreferrer"><IconLinkedIn /> LinkedIn</a>
        <a onMouseEnter={playLinkSound} onClick={playLinkSound} className="btn btn-ghost" href="https://github.com/rahulmsingh337" target="_blank" rel="noreferrer"><IconGitHub /> GitHub</a>
        <a onMouseEnter={playLinkSound} onClick={playLinkSound} className="btn btn-ghost" href="https://prompifytech.vercel.app" target="_blank" rel="noreferrer"><IconPrompify /> Prompify <ArrowUpRight size={14} /></a>
        <a onMouseEnter={playLinkSound} onClick={playLinkSound} className="btn btn-ghost" href="https://wa.me/918989805836" target="_blank" rel="noreferrer"><Phone size={16} /> WhatsApp</a>
      </div>
      </ScrubIn>
      <div className="footer-bar">
        <span>Rahul Singh — SAP ABAP Lead</span>
        <span className="avail"><i />Available for opportunities</span>
        <span>Noida, India</span>
      </div>
    </section>
  );
}
