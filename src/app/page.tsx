import AdvocatesTable from "@/components/AdvocatesTable";
import { Advocate } from "@/types/advocate";

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/advocates", {
    cache: "no-store",
  });
  const { data }: { data: Advocate[] } = await response.json();

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <AdvocatesTable advocates={data} />
    </main>
  );
}
