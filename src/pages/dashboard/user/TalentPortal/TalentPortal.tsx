import LockPortal from "@/components/user/talentPortal/LocakPortal";
import TalentPortalUnlocked from "@/components/user/talentPortal/TalentPortalUnlocked";

export default function TalentPortal() {
  const isSubscribed = true;
  return <div>{isSubscribed ? <TalentPortalUnlocked /> : <LockPortal />}</div>;
}
