import ContactDetail from "./components/ContactDetail";

interface ContactPageProps {
  params: {
    id: string;
  };
}
export default async function ContactPage({ params }: ContactPageProps) {
  const { id } = await params;
  return <ContactDetail _id={id} />;
}
