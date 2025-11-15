import WelcomeScene from "./sections/WelcomeScene";
import AboutFlow from "./sections/AboutFlow";
import ValuesOrbit from "./sections/ValuesOrbit";
import TeachersCarousel from "./sections/TeachersCarousel";
import EventsStream from "./sections/EventsStream";
import ContactPortal from "./sections/ContactPortal";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <WelcomeScene />
      <AboutFlow />
      <ValuesOrbit />
      <TeachersCarousel />
      <EventsStream />
      <ContactPortal />
    </main>
  );
}
