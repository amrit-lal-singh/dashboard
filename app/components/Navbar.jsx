```jsx
import Link from 'next/link'
import Image from 'next/image'
import Logo from './dojo-logo.png'
import mixpanel from 'mixpanel'

export default function Navbar() {
    const trackEvent = (eventName, eventProperties) => {
        mixpanel.track(eventName, eventProperties)
    }

    return (
        <nav>
            <Image src={Logo} alt='Dojo Helpdesk logo' width={70} placeholder='blur' quality={100} onClick={() => trackEvent("Logo Click", null)} />
            <h1>Dojo Helpdesk</h1>
            <Link href="/" onClick={() => trackEvent("Navigation Click", { destination: "Dashboard" })}>Dashboard</Link>
            <Link href="/tickets" onClick={() => trackEvent("Navigation Click", { destination: "Tickets" })}>Tickets</Link>
        </nav>
    )
}
```