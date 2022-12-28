import path from 'path';
import fs from 'fs';

// Access data
function buildPath() {
  // cwd = current working directory
  return path.join(process.cwd(), 'data', 'data.json');
}

function extractData(filePath) {
  const jsonData = fs.readFileSync(filePath);

  // convert into JS Object
  const data = JSON.parse(jsonData);
  return data;
}

export default function handler(req, res) {
  const { method } = req;

  // Access data.json (database)
  // Extract data at AllEvents
  // res 404 if there are no AllEvents
  // Loop and identify the EventID
  // Add the email to emails_registered array - write function to database
  // if eamil doesn't exist
  // check if email format ok

  const filePath = buildPath();
  const data = extractData(filePath);
  const { events_categories, allEvents } = extractData(filePath);

  if (!allEvents) {
    return res.status(404).json({
      status: 404,
      message: 'Events data not found',
    });
  }

  if (method === 'POST') {
    const { email, eventId } = req.body;
    console.log('req.body');
    console.log(req.body);

    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address' });
      return;
    }

    const newAllEvents = allEvents.map((ev) => {
      if (ev.id === eventId) {
        if (ev.emails_registered.includes(email)) {
          res
            .status(401)
            .json({ message: 'This email has already been registered' });
          return ev;
        }
        return {
          ...ev,
          emails_registered: [...ev.emails_registered, email],
        };
      }
      return ev; // No change if conditions not met
    });

    fs.writeFileSync(
      filePath,
      JSON.stringify({ events_categories, allEvents: newAllEvents })
    );

    res.status(200).json({
      message: `You have been registered successfuly with the email: ${email} for the event, ${eventId}.`,
    });
  }
}
