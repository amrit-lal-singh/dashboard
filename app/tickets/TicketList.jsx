```jsx
import Link from "next/link"
import mixpanel from 'mixpanel-browser';

async function getTickets() {
    const res = await fetch('http://localhost:4000/tickets', {
        next: {
            revalidate: 0 // use 0 to opt out of using cache
        }
    })
    return res.json()
}

export default async function TicketList() {
    const tickets = await getTickets()

    const handleTicketClick = (ticket) => {
        mixpanel.track('Ticket Clicked', {
            'Ticket ID': ticket.id,
            'Ticket Title': ticket.title,
            'Priority': ticket.priority
        });
    }

    const handleTicketPreview = (ticket) => {
        mixpanel.track('Ticket Preview', {
            'Ticket ID': ticket.id,
            'Ticket Title': ticket.title
        });
    }

    return (
        <>
            {tickets.map((ticket) => (
                <div key={ticket.id} className="card my-5" onClick={() => handleTicketClick(ticket)}>
                    <Link href={`/tickets/${ticket.id}`}>
                        <h3>{ticket.title}</h3>
                        <p onClick={() => handleTicketPreview(ticket)}>{ticket.body.slice(0, 200)}...</p>
                        <div className={`pill ${ticket.priority}`}>
                            {ticket.priority} priority
                        </div>
                    </Link>
                </div>
            ))}
            {tickets.length === 0 && (
                <p className="text-center">There are no open tickets, yay!</p>
            )}
        </>
    )
}
```