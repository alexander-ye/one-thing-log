import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import { getAsync, postAsync } from './api/rest';
import { produce } from 'immer';

const schema = z.object({
  title: z
    .string()
    .min(1)
    .refine((data) => {
      if (typeof data !== 'string') return false;
      return data.trim().length > 1;
    }, 'Entry must have at least one non-space character'),
});

type Schema = z.infer<typeof schema>;

export default function App() {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const [things, setThings] = useState([]);
  const [error, setError] = useState();
  useEffect(() => {
    getAsync('things')
      .then((data) => {
        console.log(data);
        setThings(data);
      })
      .catch((err) => {
        console.log('wtf');
        setError(err);
        console.error(err);
      });
  }, []);

  const onSubmit = (data: Schema) => {
    postAsync('things', JSON.stringify(data))
      .then((newThing) => {
        setThings(
          produce((draft) => {
            draft.unshift(newThing);
          })
        );
      })
      .catch((err) => {
        console.log('wtf', console.error(err));
      });
  };

  return (
    <div>
      {error ? (
        <p>
          Error fetching things{`${error?.message ? `: ${error.message}` : ''}`}
        </p>
      ) : (
        things.map((thing) => {
          return <p key={thing.id}>{thing.title}</p>;
        })
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('title')} />
        {errors.title?.message ? <p>{errors.title?.message}</p> : null}
        <input type='submit' />
      </form>
    </div>
  );
}
