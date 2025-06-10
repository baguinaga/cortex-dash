import { redirect } from "next/navigation";

//TODO: handle gracefully redirecting from /* to /dashboard/{default}
export default function Home() {
  redirect("/dashboard/pharmacy");
}
