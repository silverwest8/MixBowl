import { Title, Card } from "@tremor/react";
import { withAuth } from "@/lib/getServerSidePropsWrapper";
import Filter from "@/components/report/Filter";
import ReportTable from "@/components/report/ReportTable";
import DeleteModal from "@/components/report/DeleteModal";
import axios from "axios";
import ReportChart from "@/components/report/ReportChart";

export default function Home({ data, type }) {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-lg mb-3">신고된 콘텐츠</h1>
        <Filter />
      </div>
      <div className="mt-4 flex flex-col gap-12">
        {data.data.map(({ id, title, reports }) => (
          <Card key={id}>
            <div className="flex items-center justify-between mb-4 gap-4">
              <Title>
                <a className="hover:underline" href={`https://mixbowl-skku.com/${type === "recipe" ? "recipe" : "community"}/${id}`}>
                  {title}
                </a>
              </Title>
              <DeleteModal id={id} type={type} />
            </div>
            <ReportTable reports={reports} />
            <ReportChart reports={reports} />
          </Card>
        ))}
      </div>
    </main>
  );
}

export const getServerSideProps = withAuth(async (ctx, token) => {
  const type = ctx.query.type ?? "recipe";
  const { data } = await axios.get(
    `${process.env.BACKEND_URL}/admin/report?type=${type}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return {
    props: {
      data,
      type,
      token
    },
  };
});
