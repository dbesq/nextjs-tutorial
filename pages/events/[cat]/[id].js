import Image from 'next/image';
import SingleEvent from '../../../src/components/events/single-event';

const EventPage = ({ data }) => <SingleEvent data={data} />;

export default EventPage;

export async function getStaticPaths() {
  const data = await import(`/data/data.json`);
  const { allEvents } = data;
  console.log(`--------------------------------------------------------`);
  console.log(`[id].js allEvents`);
  console.log(allEvents);

  const allPaths = allEvents.map((path) => {
    return {
      params: {
        cat: path.city,
        id: path.id,
      },
    };
  });

  return {
    paths: allPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  console.log(`--------------------------------------------------------`);
  console.log(`[id].js context`);
  console.log(context);

  const id = context.params.id;
  console.log(`[id].js id`);
  console.log(id);

  const { allEvents } = await import(`/data/data.json`);
  const eventData = allEvents.find((ev) => id === ev.id);

  return {
    props: { data: eventData },
  };
}
