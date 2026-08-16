export { default as ContactHeader } from "./Header";
export { default as ContactForm } from "./Form";
export { default as ContactFAQ } from "./FAQ";

import ContactHeader from "./Header";
import ContactForm from "./Form";
import ContactFAQ from "./FAQ";

export default function Contact() {
  return (
    <>
      <ContactHeader />
      <ContactForm />
      <ContactFAQ />
    </>
  );
}
