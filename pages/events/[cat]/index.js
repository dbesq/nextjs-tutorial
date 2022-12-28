import Image from 'next/image';
import Link from 'next/link';
import CatEvent from '../../../src/components/events/catEvent';

// 'data' from getSTaticProps below
const EventsCat = ({ data, pageName }) => (
  <CatEvent data={data} pageName={pageName} />
);

export default EventsCat;

export async function getStaticPaths() {
  /**
   * Note: events_categories object looks like:   * 
   * "events_categories": [
    {
      "id": "london",
      "title": "Events in London",
      "description": "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem",
      "image": "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
    }, */
  const { events_categories } = await import('/data/data.json');

  // Get Event IDs - name of cities
  const allPaths = events_categories.map((ev) => {
    return {
      params: {
        cat: ev.id.toString(),
      },
    };
  });
  console.log(allPaths);

  return {
    paths: allPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  console.log('context');
  console.log(context);
  console.log(
    '----------------------------------------------------------------------------------'
  );
  /**
 * Note:
 * context object looks like:
    {
      params: { cat: 'barcelona' },
      locales: undefined,
      locale: undefined,
      defaultLocale: undefined
    }
 * 
 * 
 * allEvents object looks like:
 *   "allEvents": [
    {
      "id": "london-comic-con-winter",
      "title": "London Comic Con Winter",
      "city": "London",
      "description": "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscisfa.",
      "image": "https://images.unsplash.com/photo-1608889476561-6242cfdbf622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
      "emails_registered": []
    }, 
 */
  const id = context.params.cat;
  console.log('id');
  console.log(id);
  console.log(
    '----------------------------------------------------------------------------------'
  );

  const { allEvents } = await import('/data/data.json');
  const data = allEvents.filter((ev) => ev.city === id);

  console.log('data');
  console.log(data);
  return { props: { data: data, pageName: id } };
}
