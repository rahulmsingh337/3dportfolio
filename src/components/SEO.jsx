import { useEffect } from "react";

// Dynamically updates meta tags — helps with social sharing previews
export default function SEO() {
  useEffect(() => {
    // Ensure title is correct
    document.title = "Rahul Singh | SAP ABAP Lead | S/4HANA Transformation | ABAP Cloud Certified | RAP | CDS | OData | EAM | Accenture | Noida";

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
      "Rahul Singh — SAP ABAP Lead at Accenture. S/4HANA Transformation, ABAP Cloud Certified (C_ABAPD_2601), Clean Core, SAP EAM, RAP, CDS Views, OData V4, Custom Code Remediation. Noida, India."
    );
    setMeta("og:title", "Rahul Singh | SAP ABAP Lead Consultant", "property");
    setMeta("og:description",
      "SAP ABAP Lead at Accenture. S/4HANA migration expert. Clean Core, RAP, CDS Views, OData V4, ABAP Cloud.", "property"
    );
  }, []);

  return null;
}
