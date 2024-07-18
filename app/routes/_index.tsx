import { json, useLoaderData } from '@remix-run/react';
import { commitSession, getSession } from '../sessions';
import { LoaderFunctionArgs } from '@remix-run/node';

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'));

  let pageVisits = session.get('pageVisits') || 0;

  session.set('pageVisits', ++pageVisits);

  return json({ pageVisits }, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export default function Index() {
  const { pageVisits } = useLoaderData<typeof loader>();

  return (
    <>
      <h1>Hello World!</h1>
      <p>
        You have visited this page
        {' '}
        {pageVisits}
        {' '}
        times
      </p>
    </>
  );
}
