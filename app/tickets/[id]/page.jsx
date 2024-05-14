```jsx
import { notFound } from "next/navigation"
import mixpanel from 'mixpanel-browser';
export const dynamicParams = true // default val = true
export async function generateStaticParams() {
    const res = await fetch('http://localhost:4000/tickets')
    const tickets = await res.json()
    return tickets.map((ticket) => ({ id: ticket.id }))
}
async function getTicket(id) {
    const res = await fetch(`http://localhost:4000/tickets/${id}`, { next: { revalidate: 60 } })
    if (!res.ok) {
        notFound()
    }
    return res.json()
}
export default async function TicketDetails({ params }) {
    // const id = params.id
    const ticket = await getTicket(params.id)
    return (
        <main>
            <nav>
                <h2>Ticket Details</h2>
            </nav>
            <div className="card">
                <h3>{ticket.title}</h3>
                <small>Created by {ticket.user_email}</small>
                <p>{ticket.body}</p>
                <div className={`pill ${ticket.priority}`} onClick={() => { mixpanel.track('Ticket Details Viewed', { 'Ticket ID': ticket.id, 'User Email': ticket.user_email, 'Priority': ticket.priority }); }}>
                    {ticket.priority} priority
                </div>
            </div>
            <button type="button" onClick={() => { mixpanel.track('Sign Up'); }}>Sign Up</button>
            <video src={ticket.video_url} onClick={() => { mixpanel.track('Video Watched', { 'Genre': 'Comedy', 'Watch Time (seconds)': 200, 'Paid': 'True' }); }}></video>
        </main>
    )
}
```