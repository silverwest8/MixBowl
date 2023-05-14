import { Card, Title } from '@tremor/react';
import { cookies } from 'next/headers';
import ReportsTable from './table';
import Filter from './filter';
import axios from 'axios';
import Link from 'next/link';
import DeleteButton from './delete-button';
import Cookies from 'js-cookie';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

async function getReports(type, token) {
  try {
    const response = await axios.get(
      `${process.env.BACKEND_URL}/admin/report?type=${type}`,
      {
        headers: {
          Authorization: token
        }
      }
    );
    return response;
  } catch (e) {
    console.log(e);
  }
}

export default async function IndexPage({ searchParams }) {
  const type = searchParams.type ?? 'recipe';
  const token = cookies().get('token').value;
  const { data } = await getReports(type, token);
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
                <Link className="hover:underline" href="/" passHref>
                  {title}
                </Link>
              </Title>
              <DeleteButton id={id} />
            </div>
            <ReportsTable reports={reports} />
          </Card>
        ))}
      </div>
    </main>
  );
}
