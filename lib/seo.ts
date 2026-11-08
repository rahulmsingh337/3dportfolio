import { SITE } from "@/lib/data/site";

const U = SITE.url;
const credly = (id: string) => `https://www.credly.com/badges/${id}`;
const cred = (name: string, url?: string) => ({
  "@type": "EducationalOccupationalCredential", name, credentialCategory: "Professional Certification",
  recognizedBy: { "@type": "Organization", name: "SAP SE" }, ...(url ? { url } : {}),
});

export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person", "@id": `${U}/#person`, name: SITE.name, alternateName: "Rahul Singh SAP", jobTitle: SITE.role,
      description: "SAP ABAP Lead at Accenture working on S/4HANA transformation, ABAP Cloud, Clean Core, SAP EAM, RAP, CDS Views, OData V4 and custom code remediation.",
      url: `${U}/`, image: { "@type": "ImageObject", url: `${U}/rahul-880.webp`, width: 880, height: 1320 }, email: SITE.email,
      address: { "@type": "PostalAddress", addressLocality: "Noida", addressRegion: "Uttar Pradesh", addressCountry: "IN" },
      sameAs: [SITE.linkedin, SITE.github],
      knowsAbout: ["SAP ABAP", "S/4HANA Transformation", "ABAP Cloud", "Clean Core", "SAP EAM", "Custom Code Remediation", "CDS Views", "RAP", "OData V4", "SAP BTP", "SAP Fiori", "ATC", "AMDP", "SAP Workflow", "BAPIs", "IDocs"],
      hasCredential: [
        cred("SAP Certified Back-End Developer - ABAP Cloud (C_ABAPD_2601)"),
        cred("SAP Certified - SAP Generative AI Developer", credly("cab1bb32-9291-400d-82d3-e8fd8327b0c0")),
        cred("SAP Certified - SAP S/4HANA Conversion and SAP System Upgrade", credly("1b8a388a-5611-4175-9e26-c9916ed5b442")),
        cred("SAP Certified - Positioning SAP Business AI Platform", credly("d1912d28-7b2a-437f-b88f-b9a67b841a61")),
        cred("SAP Certified - Positioning the Autonomous Enterprise", credly("13bb62a4-9d1a-478f-8b73-830b1a6c942d")),
      ],
      worksFor: { "@type": "Organization", name: "Accenture", url: "https://www.accenture.com" },
      alumniOf: { "@type": "EducationalOrganization", name: "Vellore Institute of Technology", url: "https://vit.ac.in" },
    },
    { "@type": "WebSite", "@id": `${U}/#website`, url: `${U}/`, name: "Rahul Singh | SAP ABAP Lead", inLanguage: "en-IN", author: { "@id": `${U}/#person` } },
    { "@type": "ProfilePage", "@id": `${U}/#profilepage`, url: `${U}/`, name: "Rahul Singh - SAP ABAP Lead", inLanguage: "en-IN", about: { "@id": `${U}/#person` }, mainEntity: { "@id": `${U}/#person` } },
  ],
};
