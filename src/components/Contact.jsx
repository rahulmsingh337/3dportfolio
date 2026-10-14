import { Mail, Phone, ArrowUpRight, Copy } from "lucide-react";
import { IconLinkedIn, IconGitHub, IconPrompify } from "./Icons";
import { playLinkSound } from "../utils/linkSound";
import { copyText, toast } from "../utils/toast";

const EMAIL = "rs58598@gmail.com";
const copyEmail = async () => toast((await copyText(EMAIL)) ? "Email address copied" : "Copy failed. Use " + EMAIL);

export default function Contact() {
  return (
    <section id="contact" className="wrap contact">
      <div className="eyebrow" style={{ justifyContent: "center" }}>
        <span>06</span><span className="rule" /><span>Contact</span>
      </div>
      <h2 className="display">
        <span className="sr-only">Contact Rahul Singh, SAP ABAP Lead: </span>
        Let&apos;s build something <em>exceptional.</em>
      </h2>
      <p className="lede">
        Open to SAP ABAP Cloud and S/4HANA transformation engagements and senior roles. Based in Noida, India, working with global teams.
      </p>
      <div className="contact-links">
        <a onMouseEnter={playLinkSound} onClick={playLinkSound} className="btn btn-primary" href="mailto:rs58598@gmail.com"><Mail size={16} /> Email me</a>
        <button type="button" className="btn btn-ghost" onMouseEnter={playLinkSound} onClick={copyEmail}><Copy size={16} /> Copy email</button>
        <a onMouseEnter={playLinkSound} onClick={playLinkSound} className="btn btn-ghost" href="https://www.linkedin.com/in/rahul-singh-sap-abap/" target="_blank" rel="noreferrer"><IconLinkedIn /> LinkedIn</a>
        <a onMouseEnter={playLinkSound} onClick={playLinkSound} className="btn btn-ghost" href="https://github.com/rahulmsingh337" target="_blank" rel="noreferrer"><IconGitHub /> GitHub</a>
        <a onMouseEnter={playLinkSound} onClick={playLinkSound} className="btn btn-ghost" href="https://prompifytech.vercel.app" target="_blank" rel="noreferrer"><IconPrompify /> Prompify <ArrowUpRight size={14} /></a>
        <a onMouseEnter={playLinkSound} onClick={playLinkSound} className="btn btn-ghost" href="https://wa.me/918989805836" target="_blank" rel="noreferrer"><Phone size={16} /> WhatsApp</a>
      </div>
      <div className="footer-bar">
        <span>Rahul Singh — SAP ABAP Lead</span>
        <span className="avail"><i />Available for opportunities</span>
        <span>Noida, India</span>
      </div>
    </section>
  );
}
