import { useEffect } from "react";

// Dynamically updates meta tags — helps with social sharing previews
export default function SEO() {
  useEffect(() => {
    // Ensure title is correct
    document.title = "Rahul Singh | SAP ABAP Lead Consultant | S/4HANA · Clean Core · RAP · OData · Noida";

    // Add any missing meta programmatically
    const setMeta = (name, content, attr = "name") => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description",
      "Rahul Singh — SAP ABAP Lead Consultant at Accenture. 5+ years in ECC-to-S/4HANA migration, HANA remediation, Clean Core, CDS Views, RAP, OData V4, SAP BTP. Noida, India."
    );
    setMeta("og:title", "Rahul Singh | SAP ABAP Lead Consultant", "property");
    setMeta("og:description",
      "SAP ABAP Lead at Accenture. S/4HANA migration expert. Clean Core, RAP, CDS Views, OData V4, ABAP Cloud.", "property"
    );
  }, []);

  return null;
}
