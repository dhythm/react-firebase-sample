import { db } from '@app/lib/firebase-config';
import React from 'react';
import { useAsync } from 'react-use';

export const HomePage: React.FunctionComponent = () => {
  const { loading, error, value: snapshot } = useAsync(
    async () => await db.collection('users').get(),
  );
  if (loading) return <div>loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <>
      {snapshot.docs.map((doc, i) => (
        <div key={i}>Hello, {doc.data().name}</div>
      ))}
    </>
  );
};
