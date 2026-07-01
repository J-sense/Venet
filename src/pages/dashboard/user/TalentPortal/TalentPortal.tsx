import LockPortal from "./components/LocakPortal";
import TalentPortalUnlocked from "./components/TalentPortalUnlocked";

export default function TalentPortal() {
  const isSubscribed = true;
  return <div>{isSubscribed ? <TalentPortalUnlocked /> : <LockPortal />}</div>;
}
